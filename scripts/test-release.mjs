import { createHash } from 'node:crypto';
import { spawn, execFileSync } from 'node:child_process';
import { mkdir, readFile, writeFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, isAbsolute, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

// Keep the runner's read-only API credential out of npm and the CAD child processes.
const githubApiToken = process.env.GITHUB_TOKEN;
delete process.env.GITHUB_TOKEN;

// Only a compiled release asset or an explicit local candidate is installed. No private source or user model.
const tag = process.env.FORMA_RELEASE_TAG ?? 'v0.6.8-preview.20261103-rc3';
assert(/^v\d+\.\d+\.\d+(?:-[A-Za-z0-9.-]+)?$/.test(tag), 'Invalid release tag');
const root = process.env.FORMA_QA_DIR;
assert(root && isAbsolute(root), 'FORMA_QA_DIR must name a new absolute external directory');
const repository = fileURLToPath(new URL('../', import.meta.url));
const rel = relative(repository, root);
assert(rel.startsWith('..') || isAbsolute(rel), 'Keep QA data outside the repository');
await mkdir(root);
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const proof = { tag, platform: process.platform, arch: process.arch, node: process.version, commands: [], passed: false };
let server, bridge, serverPid, browserPid;
const children = new Set();
const alive = pid => { try { process.kill(pid, 0); return true; } catch { return false; } };
const exited = child => child.exitCode !== null || child.signalCode !== null;
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
const start = (args, env = {}) => {
  const child = spawn(process.execPath, args, { windowsHide: true, stdio: ['pipe', 'pipe', 'pipe'], env: { ...process.env, ...env } });
  children.add(child); child.on('error', () => {}); return child;
};
const npmCli = [join(dirname(process.execPath), 'node_modules/npm/bin/npm-cli.js'), join(dirname(process.execPath), '../lib/node_modules/npm/bin/npm-cli.js')].find(existsSync);
assert(npmCli, 'Expected npm alongside Node.js');
const npm = args => execFileSync(process.execPath, [npmCli, ...args], { windowsHide: true, encoding: 'utf8', env: { ...process.env, npm_config_cache: join(root, 'npm-cache') }, maxBuffer: 1024 * 1024 });
try {
  let packageBytes;
  if (process.env.FORMA_QA_TARBALL) {
    assert(isAbsolute(process.env.FORMA_QA_TARBALL), 'Local candidate path must be absolute');
    packageBytes = await readFile(process.env.FORMA_QA_TARBALL);
    proof.source = 'local-candidate';
  } else {
    const apiHeaders = { 'User-Agent': 'Alien-Forma-install-check', Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28' };
    if (githubApiToken) apiHeaders.Authorization = `Bearer ${githubApiToken}`;
    const api = await fetch(`https://api.github.com/repos/congestedai/Forma/releases/tags/${tag}`, { headers: apiHeaders });
    assert(api.ok, `Release lookup failed: ${api.status}`);
    proof.releaseLookupAuthenticated = Boolean(githubApiToken);
    const release = await api.json();
    assert.equal(release.tag_name, tag, 'Release tag mismatch');
    assert(!release.draft, 'Only published release assets are tested by remote runners');
    const asset = release.assets.find(x => x.name === 'Forma-cli.tgz');
    assert(asset && asset.state === 'uploaded');
    const download = async asset => {
      assert(asset && asset.state === 'uploaded', 'Release asset is not ready');
      const response = await fetch(asset.browser_download_url);
      assert(response.ok, `Asset download failed: ${response.status}`);
      return Buffer.from(await response.arrayBuffer());
    };
    packageBytes = await download(asset);
    assert.equal(`sha256:${sha(packageBytes)}`, asset.digest);
    const sums = (await download(release.assets.find(x => x.name === 'SHA256SUMS.txt'))).toString('utf8');
    assert(sums.split(/\r?\n/).includes(`${sha(packageBytes)}  Forma-cli.tgz`));
    proof.source = 'published-release';
  }
  const tarball = join(root, 'Forma-cli.tgz'); await writeFile(tarball, packageBytes, { flag: 'wx' });
  proof.packageSha256 = sha(packageBytes);
  const prefix = join(root, 'installed');
  npm(['install', '--global', '--prefix', prefix, '--ignore-scripts', '--no-audit', '--no-fund', tarball]);
  const installed = join(prefix, ...(process.platform === 'win32' ? [] : ['lib']), 'node_modules/@congestedai/forma');
  const bin = join(installed, 'bin/forma.mjs'), metadata = JSON.parse(await readFile(join(installed, 'package.json'), 'utf8'));
  proof.version = metadata.version;
  assert.equal(metadata.version, tag.slice(1)); assert.equal(Object.keys(metadata.dependencies ?? {}).length, 0);
  const integrity = JSON.parse(await readFile(join(installed, 'integrity.json'), 'utf8'));
  for (const file of integrity.files) {
    assert(!isAbsolute(file.name) && !file.name.split(/[\\/]/).includes('..'));
    assert.equal(sha(await readFile(join(installed, file.name))), file.sha256, `Installed bytes: ${file.name}`);
  }
  proof.installedFilesVerified = integrity.files.length;
  if (process.platform !== 'win32') {
    const shim = join(prefix, 'bin/forma'); assert((await stat(shim)).mode & 0o111);
    assert.match(execFileSync(shim, ['--help'], { encoding: 'utf8' }), /forma mcp/);
  } else assert.match(execFileSync(process.execPath, [bin, '--help'], { encoding: 'utf8' }), /forma mcp/);
  proof.commandShimVerified = true;
  const projects = join(root, 'projects'), grant = join(projects, 'smoke'); await mkdir(grant, { recursive: true });
  const env = { FORMA_PROJECTS_DIR: projects, FORMA_TEMP_DIR: join(root,'outputs'), FORMA_DATA_DIR: join(root,'profile') };
  server = start([bin, '--no-open', '--json', '--port', '5252'], env);
  let serverError = ''; server.stderr.on('data', b => { serverError = (serverError + b).slice(-2000); });
  const started = await new Promise((resolve, reject) => {
    let output = ''; const timer = setTimeout(() => reject(Error('Server startup timeout: ' + serverError)), 15000);
    server.once('exit', () => { clearTimeout(timer); reject(Error('Server exited: ' + serverError)); });
    server.stdout.on('data', b => { output += b; if (output.includes('\n')) { clearTimeout(timer); try { resolve(JSON.parse(output.split('\n')[0])); } catch (e) { reject(e); } } });
  });
  assert.equal(started.origin, 'http://127.0.0.1:5252'); serverPid = started.pid;
  const html = Buffer.from(await (await fetch(started.origin)).arrayBuffer()), indexSha = sha(html);
  assert.equal(indexSha, sha(await readFile(join(installed, 'runtime/dist/index.html'))));
  proof.compiledEntryVerified = true;
  bridge = start([bin, 'mcp', '--root', grant, '--port', '5252', '--index-sha256', indexSha, '--session', 'isolated', '--headless'], env);
  let stderr = '', text = '', sequence = 0; const pending = new Map();
  bridge.stderr.on('data', b => { stderr = (stderr + b).slice(-2000); });
  bridge.stdout.setEncoding('utf8'); bridge.stdout.on('data', chunk => {
    text += chunk; let end;
    while ((end = text.indexOf('\n')) >= 0) { const response = JSON.parse(text.slice(0, end)); text = text.slice(end + 1); pending.get(response.id)?.resolve(response); pending.delete(response.id); }
  });
  bridge.once('exit', () => { for (const p of pending.values()) p.reject(Error('MCP exited: ' + stderr)); pending.clear(); });
  const call = async (method, params) => {
    const id = ++sequence; let timer;
    try {
      const reply = await new Promise((resolve, reject) => { pending.set(id, { resolve, reject }); timer = setTimeout(() => { pending.delete(id); reject(Error('MCP timeout: ' + method + ': ' + stderr)); }, 90000); bridge.stdin.write(JSON.stringify({ jsonrpc: '2.0', id, method, params }) + '\n'); });
      assert(!reply.error && !reply.result?.isError, JSON.stringify(reply.error ?? reply.result?.structuredContent?.error));
      proof.commands.push({ method, tool: params?.name, command: params?.arguments?.command }); return reply.result;
    } finally { clearTimeout(timer); }
  };
  const tool = async (name, args) => { const r = await call('tools/call', { name, arguments: args }); return r.structuredContent ?? r; };
  const command = (name, input) => tool('execute', { command: name, input });
  const status = async () => { const s = await tool('status', { section: 'summary' }); browserPid ??= s.browserPid; return s; };
  const intent = async () => { const s = await status(); return { document_id: s.partDesignDocument.id, revision: s.partDesignDocument.revision, state_id: s.partDesignDocument.stateId }; };
  await call('initialize', { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 'forma-public-install-check', version: '1' } });
  bridge.stdin.write(JSON.stringify({ jsonrpc: '2.0', method: 'notifications/initialized' }) + '\n');
  const catalog = await call('tools/list', {}); assert.deepEqual(catalog.tools.map(x => x.name).sort(), ['describe', 'discover', 'execute', 'status']);
  await tool('discover', {}); await status();
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="20mm" height="10mm" viewBox="0 0 20 10"><path d="M0 0H20V10H0Z" fill="black"/></svg>';
  await command('file_put', { name: 'rectangle.svg', data_base64: Buffer.from(svg).toString('base64') });
  await command('svg_import', { name: 'rectangle.svg' });
  await command('project_save', { name: 'profile.forma.json' });
  const profileDocument = JSON.parse(await readFile(join(grant, 'profile.forma.json'), 'utf8')).document;
  const profile = profileDocument.nodes.find(x => x.type === 'external-profile'); assert(profile);
  await command('select_entity', { ...await intent(), kind: 'node', id: profile.id });
  await command('extrude', { ...await intent(), profile_id: profile.id });
  await command('project_save', { name: 'solid.forma.json' });
  const solidBytes = await readFile(join(grant, 'solid.forma.json')), solid = JSON.parse(solidBytes).document;
  assert(solid.nodes.some(x => x.type === 'pad')); assert.equal(solid.bodies.length, 1);
  const modelExport = await command('export', { format: '3mf', name: 'solid.3mf' });
  const artifactPath = result => {
    assert.equal(result.destination, 'temporary', 'Derived files must stay separate from project documents');
    assert(isAbsolute(result.path), 'MCP must report the actual output path');
    const rel = relative(env.FORMA_TEMP_DIR, result.path);
    assert(rel && !rel.startsWith('..') && !isAbsolute(rel), 'Artifact escaped the isolated output root');
    return result.path;
  };
  const modelBytes = await readFile(artifactPath(modelExport));
  assert(modelBytes.length > 100);assert.equal(modelBytes.length,modelExport.bytes);assert.equal(sha(modelBytes),modelExport.sha256);
  assert(!existsSync(join(grant, 'solid.3mf')), 'Derived export must not pollute the project folder');
  proof.derivedDestinationVerified = true;
  await command('project_open', { name: 'solid.forma.json' });
  await command('project_save', { name: 'reopened.forma.json' });
  assert(solidBytes.equals(await readFile(join(grant, 'reopened.forma.json'))));
  const capture = await call('tools/call', { name: 'execute', arguments: { command: 'viewport_capture', input: { name: 'smoke.png' } } });
  assert(capture.content.some(x => x.type === 'image'));
  const captured = capture.structuredContent;
  const png = await readFile(artifactPath(captured));
  assert.equal(sha(png),captured.sha256);assert.equal(png.readUInt32BE(0),0x89504e47);
  await writeFile(join(root, 'smoke.png'), png);
  proof.nativeSvgExtrusion = true; proof.native3mf = true; proof.exactSaveReopen = true; proof.actualPng = true; proof.passed = true;
} catch (error) { proof.error = { message: error.message.slice(0, 1800) }; process.exitCode = 1; }
finally {
  if (bridge) { bridge.stdin.end(); for (let i = 0; !exited(bridge) && i < 50; i++) await wait(100); if (!exited(bridge)) bridge.kill(); }
  if (server) { server.kill(); for (let i = 0; !exited(server) && i < 30; i++) await wait(100); }
  for (let i = 0; browserPid && alive(browserPid) && i < 30; i++) await wait(100);
  proof.cleanup = { bridgeClosed: !bridge || exited(bridge) && !alive(bridge.pid), serverClosed: !server || exited(server) && !alive(serverPid ?? server.pid), browserClosed: !browserPid || !alive(browserPid) };
  if (!Object.values(proof.cleanup).every(Boolean)) { proof.passed = false; proof.cleanupFailed = true; process.exitCode = 1; }
  await writeFile(join(root, 'proof.json'), JSON.stringify(proof, null, 2) + '\n');
  console.log(JSON.stringify(proof));
}

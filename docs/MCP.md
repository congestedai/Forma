# Use Alien Forma with an MCP client

Install the command-line package matching your desktop version. See [Installation](INSTALACAO.md). The updated Electron desktop exposes a visible native window; Chrome or Chromium is required for a separate browser interaction session.

Run `forma --projects-dir` to find the projects root. Create a dedicated folder inside it and use that folder's absolute path in your client configuration:

```json
{
  "mcpServers": {
    "forma": {
      "command": "forma",
      "args": ["mcp", "--root", "ABSOLUTE_PATH_TO_PROJECT_FOLDER"]
    }
  }
}
```

Some Windows clients require `forma.cmd` in the `command` field. The default root is `~/Forma/Projetos`; `FORMA_PROJECTS_DIR` can set another absolute external root. The bridge requires an existing subfolder of that root and rejects links and overwrites. Use a folder dedicated to the current project.

## macOS/Linux setup without a global installation

Start the application using the npm command in the [installation guide](INSTALACAO.md#macos-and-linux-command-line). Create a project folder, for example `mkdir -p "$HOME/Forma/Projetos/AI"`, then configure your MCP client:

```json
{
  "mcpServers": {
    "forma": {
      "command": "npx",
      "args": [
        "--yes",
        "--package=https://github.com/congestedai/Forma/releases/download/v0.7.0-preview.rc7/Forma-cli.tgz",
        "forma", "mcp", "--root", "ABSOLUTE_PATH_TO_PROJECT_FOLDER"
      ]
    }
  }
}
```

Replace the last argument with the real absolute path. `~` and `$HOME` are not expanded automatically inside this JSON. The client must find Node.js/npm on PATH. npm obtains and starts the software; MCP exposes its tools to the assistant. Using this GitHub package does not require an npm account.

## Visible desktop and session choice

The bridge defaults to `--session auto`: it looks for a free visible native window and can open the desktop app when available. The window stays open after the bridge disconnects so you can continue editing. The small MCP indicator shows activity; open it to inspect commands and saved/exported filenames.

- `--session current` requires an available running window and modifies its current project. Save your work and grant only the intended project folder.
- `--session isolated` uses a separate browser session. Chrome or Chromium is required. `--headless` is intended for CI, not live viewing.
- `--port` selects the app instance. Keep the CLI package and application version aligned. A busy or unavailable session returns an error rather than silently replacing your work.

For an already-open matching desktop, add `--session current --port 4173` to the MCP arguments above, using the actual port if different. The Store app and downloaded CLI update separately.

The bridge supports capability discovery, status, execution and cancellation. Start with discovery and current status, then use returned identifiers and revisions when changing a document. Captures and inspections help verify the result. These tools do not guarantee that an AI will correctly model the intended object.

The protocol is not exclusive to any provider or model. Connection support and response handling depend on the MCP client. Your AI client may send project data to its provider according to your settings; review those settings before granting project access.

## Automation language

Starting with 0.6.2, the disposable browser used by the MCP bridge has a fixed Portuguese automation language so its existing public-control selectors remain consistent on all host languages. This does not change the language or saved preferences in your normal application profile. Captures from the isolated MCP session therefore show its automation language.

## 0.7.0 workflow improvements

Animation is experimental. For now, the most practical way to set up motion is with an AI agent connected through MCP. We are improving manual setup in the interface to make it simpler and more intuitive.

The Animation workspace and MCP support partial joint poses, per-joint keyframes, PNG/GIF sequences and sampled inspection batches. User and agent cameras are independent; edit control can be handed back explicitly. Connection feedback is steadier, and batch edits support Undo. Surface evidence and inconclusive results remain distinct. Structural analysis requires external supported solver components, not bundled in public packages. Isolated English sessions can still have workspace-selector limitations.

# Use Alien Forma with an MCP client

## Quick connection

Open Alien Forma, open its MCP panel and copy the connection instructions. Use the port shown in that window. Start one persistent stdio connection for the task, then request model_guide topic=workflow and model_read. After registering a new server, start a new client session so its tools can load.

## Windows — Microsoft Store

Store package **0.7.3.0** (submitted for certification) includes the forma.exe execution alias and its own Node runtime. It needs neither npm nor an external Node.js installation. Older Store packages still require the separate CLI. After installing the update, open a new terminal and generate the client configuration:

~~~powershell
forma mcp --print-config claude --port 4173
~~~

Replace 4173 with the port shown by the app. The generated Store configuration uses Windows PowerShell to locate the installed package and forward UTF-8 stdio to embedded Node, without opening a second GUI. Register that configuration in your MCP client and start a new session.

## Portable, macOS and Linux

Install the command-line package matching your desktop build; see [Installation](INSTALACAO.md). The separate CLI package needs Node.js 22.12 or newer. It can also run without a global install:

~~~json
{
  "mcpServers": {
    "forma": {
      "command": "npx",
      "args": ["--yes", "--package=https://github.com/congestedai/Forma/releases/download/v0.7.0-preview.rc7/Forma-cli.tgz", "forma", "mcp", "--port", "4173"]
    }
  }
}
~~~

No --root is required. Choose the save/export directory for each operation; ask the user where to save, with the system Desktop as the fallback. An explicit --root only changes the default directory. Keep the original project intact and save modifications as a new copy.

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

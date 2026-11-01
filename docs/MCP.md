# Use Alien Forma with an MCP client

Install the command-line package and start Alien Forma before connecting the bridge. See [Installation](INSTALACAO.md). Chrome or Chromium must also be installed for the bridge's isolated interaction session.

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
        "--package=https://github.com/congestedai/Forma/releases/download/v0.6.2-preview.20261101/Forma-cli.tgz",
        "forma", "mcp", "--root", "ABSOLUTE_PATH_TO_PROJECT_FOLDER"
      ]
    }
  }
}
```

Replace the last argument with the real absolute path. `~` and `$HOME` are not expanded automatically inside this JSON. The client must find Node.js/npm on PATH. npm obtains and starts the software; MCP exposes its tools to the assistant. Using this GitHub package does not require an npm account.

The bridge supports capability discovery, status, execution and cancellation. Start with discovery and current status, then use returned identifiers and revisions when changing a document. Captures and inspections help verify the result. These tools do not guarantee that an AI will correctly model the intended object.

The protocol is not exclusive to any provider or model. Connection support and response handling depend on the MCP client. Your AI client may send project data to its provider according to your settings; review those settings before granting project access.

## Automation language

Starting with 0.6.2, the disposable browser used by the MCP bridge has a fixed Portuguese automation language so its existing public-control selectors remain consistent on all host languages. This does not change the language or saved preferences in your normal application profile. Captures from the isolated MCP session therefore show its automation language.

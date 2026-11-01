# Install and update Alien Forma

## Windows portable

1. Open the [releases](https://github.com/congestedai/Forma/releases) and download `Forma-windows-x64-portable.exe` from the version you want.
2. Save it in a folder where you have write permission, then run it.
3. Before updating, close the application. Replace the executable and preserve `Forma-data`, which contains the portable profile and its saved projects.

The current executable has no publisher digital signature. Download it from this official repository and compare its SHA-256 with `SHA256SUMS.txt` in the same release:

```powershell
Get-FileHash .\Forma-windows-x64-portable.exe -Algorithm SHA256
```

## macOS and Linux command line

With Node.js 22.12 or newer and npm installed, start this release without an npm account:

```sh
npm exec --yes --package=https://github.com/congestedai/Forma/releases/download/v0.6.2-preview.20261101/Forma-cli.tgz -- forma
```

This downloads the compiled application and opens it in your default browser. Keep the terminal open while using Alien Forma; Ctrl+C stops the server. Add `--no-open` after `forma` to start without opening a browser automatically.

An AI assistant with permission to install and start local software can also run this command. MCP then provides the connection for operating the application; see [MCP setup](MCP.md).

To keep the command installed for your user, without `sudo`:

```sh
npm install --global --prefix "$HOME/.local" https://github.com/congestedai/Forma/releases/download/v0.6.2-preview.20261101/Forma-cli.tgz
"$HOME/.local/bin/forma"
```

To call `forma` directly, add `$HOME/.local/bin` to your shell's PATH. The short package name `@congestedai/forma` has **not** been published to the npm registry. These commands use the official GitHub release asset.

## Install a downloaded package

Requires Node.js 22.12 or newer. Download `Forma-cli.tgz` from a [release](https://github.com/congestedai/Forma/releases), then run:

```sh
npm install -g ./Forma-cli.tgz
forma
```

The package contains the compiled application and serves its interface on localhost. No CAD compilation is required. In PowerShell, the command can also be called as `forma.cmd`.

```sh
forma --no-open
forma --no-open --port 5252
forma --projects-dir
```

Ctrl+C stops the server. An occupied port is rejected to preserve an existing session. Browser and portable profiles are separate; export your theme library to transfer it. Save projects and keep an external backup before updating.

Version 0.6.2 is a preview. Windows checks are complete; native Linux x64 and macOS Intel/Apple Silicon checks for this exact package are [in progress](https://github.com/congestedai/Forma/actions/runs/41341093179). Read the release notes for current results and limitations.

## Interface language

Automatic detection follows your browser/system preference. In File → Preferences, choose Automatic or a specific interface language. This setting belongs to the local profile; project names, expressions, imported theme names, and stored model data are preserved. No online translation service is used.

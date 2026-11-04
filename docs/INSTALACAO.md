# Install and update Alien Forma

## Windows — Microsoft Store

[Download Alien Forma from Microsoft Store](https://apps.microsoft.com/detail/9MW9G4MGBXZL).

Available version: **0.6.4.0**, Windows 10/11 x64, checked 2 November 2026. Use Microsoft Store to install and manage updates. The Store installation does not add the global `forma` command; MCP setup still needs the separate CLI package and its dependencies described in the [MCP guide](MCP.md).

New preview builds will be published on **GitHub first**. Store updates follow Microsoft's review and may arrive later. GitHub now offers 0.6.8-preview.20261103-rc3. Store 0.6.4.0 is the last verified public version; its 0.6.8.0 update was submitted on 4 November 2026 and is awaiting Microsoft certification. Check the [release channels](VERSOES.md) for the version offered by each channel. Store, portable and browser profiles are separate: save projects and export themes before switching distributions; do not assume settings or local projects transfer automatically.

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
npm exec --yes --package=https://github.com/congestedai/Forma/releases/download/v0.6.8-preview.20261103-rc3/Forma-cli.tgz -- forma
```

This downloads the compiled application and opens it in your default browser. Keep the terminal open while using Alien Forma; Ctrl+C stops the server. Add `--no-open` after `forma` to start without opening a browser automatically.

An AI assistant with permission to install and start local software can also run this command. MCP then provides the connection for operating the application; see [MCP setup](MCP.md).

To keep the command installed for your user, without `sudo`:

```sh
npm install --global --prefix "$HOME/.local" https://github.com/congestedai/Forma/releases/download/v0.6.8-preview.20261103-rc3/Forma-cli.tgz
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

Version 0.6.8 remains a preview. Windows qualification covers the final portable and CLI. [Checks of this exact CLI package passed on Linux x64, macOS Intel and Apple Silicon](https://github.com/congestedai/Forma/actions/runs/41769993463) with Node.js 22.12.0: installed-file integrity, command shim, compiled application, isolated browser MCP extrusion, 3MF/PNG outputs, exact save/reopen and cleanup. These are CLI/browser checks; no Mac/Linux Electron package is supplied. Read the release notes for limitations.

## Interface language

Automatic detection follows your browser/system preference. In File → Preferences, choose Automatic or a specific interface language. This setting belongs to the local profile; project names, expressions, imported theme names, and stored model data are preserved. No online translation service is used.

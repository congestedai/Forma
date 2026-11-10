# Install and update Alien Forma

## Windows — Microsoft Store

[Download Alien Forma from Microsoft Store](https://apps.microsoft.com/detail/9MW9G4MGBXZL).

Available version: **0.7.3.0**; **0.7.4.0 submitted for certification**. Use Microsoft Store to install and manage updates. Store package 0.7.3.0 adds the `forma.exe` execution alias and uses its embedded Node runtime for MCP; a separate Node.js/npm installation is not needed for this Store connection. See the [MCP guide](MCP.md).

New preview builds will be published on **GitHub first**. Store updates follow Microsoft's review and may arrive later. The existing 0.7 GitHub release now contains maintenance build 0.7.4; Microsoft Store offers 0.7.3.0 while 0.7.4.0 is under separate certification. Check the [release channels](VERSOES.md) for the version offered by each channel. Store, portable and browser profiles are separate: save projects and export themes before switching distributions; do not assume settings or local projects transfer automatically.

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
npm exec --yes --package=https://github.com/congestedai/Forma/releases/download/v0.7.0-preview.rc7/Forma-cli.tgz -- forma
```

This downloads the compiled application and opens it in your default browser. Keep the terminal open while using Alien Forma; Ctrl+C stops the server. Add `--no-open` after `forma` to start without opening a browser automatically.

An AI assistant with permission to install and start local software can also run this command. MCP then provides the connection for operating the application; see [MCP setup](MCP.md).

To keep the command installed for your user, without `sudo`:

```sh
npm install --global --prefix "$HOME/.local" https://github.com/congestedai/Forma/releases/download/v0.7.0-preview.rc7/Forma-cli.tgz
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

Version 0.7.4 is a maintenance build in the existing preview channel. Its Windows portable and embedded-Node MCP connection passed targeted package checks. [The exact 0.7.0 CLI passed installation, MCP modeling, capture, export and save/reopen on Linux x64, macOS Intel and Apple Silicon](https://github.com/congestedai/Forma/actions/runs/42731199567). These are basic workflow checks, not certification of every tool or desktop. The CLI runs Alien Forma in a compatible browser. Read the release notes for limitations.

## Interface language

Automatic detection follows your browser/system preference. In File → Preferences, choose Automatic or a specific interface language. This setting belongs to the local profile; project names, expressions, imported theme names, and stored model data are preserved. No online translation service is used.

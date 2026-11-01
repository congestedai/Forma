# Alien Forma

Parametric CAD by **CongestedAI**, with local modeling, painting and texturing tools, plus MCP integration for compatible AI assistants. “Forma” is the application's short name.

**[Download](https://github.com/congestedai/Forma/releases) · [Install with a command](docs/INSTALACAO.md#macos-and-linux-command-line) · [Installation](docs/INSTALACAO.md) · [MCP](docs/MCP.md) · [Themes](docs/TEMAS.md)**

This repository contains official downloads, release notes, documentation, issue reports and distribution validation scripts. The original application source code is private. This repository does not grant an open-source license for the application.

## Downloads

| Distribution | Requirements |
| --- | --- |
| Windows x64 portable | Run the executable; Node.js is not required. Preserve the adjacent `Forma-data` folder when updating. |
| Command-line package (.tgz) | Node.js 22.12 or newer; includes the compiled browser application and MCP bridge. |

Downloads and `SHA256SUMS.txt` are attached to each [release](https://github.com/congestedai/Forma/releases). The current [0.6.2 language preview](https://github.com/congestedai/Forma/releases/tag/v0.6.2-preview.20261101) has passed Windows installation, the actual portable entry, MCP extrusion, exact save/reopen, 3MF export, and PNG capture. Native checks of this exact package also passed on Linux x64, macOS Intel, and macOS Apple Silicon with Node.js 22.12.0: installation, command shim, server, MCP, SVG extrusion, exact save/reopen, 3MF, and PNG. See the [results](https://github.com/congestedai/Forma/actions/runs/41341093179). These are basic preview checks, not validation of every tool or a performance guarantee.

The current release is a **preview**. No stable release has been published yet. Read the release notes for known limitations.

## Interface languages

Portuguese, English, Spanish, German, French, Japanese, Russian, and Simplified Chinese. Automatic detection follows browser/system preferences. Change the language in **File → Preferences**; the choice is saved locally. Language packs work offline and preserve project names, expressions, and model data. Translations are AI-assisted and feedback is welcome.

## Use and support

Free for personal, non-commercial use. **[Contribute US$1 to support Alien Forma](https://www.patreon.com/c/FormaCAD).**

Personal and commercial use conditions are described in the [license](LICENSE.txt), also supplied with the application. Contributions fund development. All users receive the same CAD tools.

## AI and MCP

Alien Forma is developed with the help of AI tools. MCP allows compatible clients to inspect and modify projects through the application's available tools. The integration is not exclusive to a particular provider or model. Results depend on the client's capabilities and configuration. See [MCP setup](docs/MCP.md).

## Credits and feedback

Alien Forma uses third-party libraries under their own licenses, including React, Three.js and Manifold. The [complete notices](THIRD_PARTY_NOTICES.txt) accompany every distribution. Alien Forma's license does not restrict rights granted by those libraries' authors.

[Report a problem](https://github.com/congestedai/Forma/issues/new/choose) with the exact version and a small reproduction. Community feedback is welcome through Issues. Pull requests are limited to invited collaborators. Never publish passwords, keys, personal documents or confidential projects.

Repository addresses, the `forma` command and `.forma.json` files retain their names for compatibility.

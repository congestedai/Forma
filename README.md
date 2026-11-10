# Alien Forma — parametric CAD with AI tools through MCP

**Alien Forma** is parametric CAD by **CongestedAI**, with local modeling, painting and texturing tools, plus MCP integration for compatible AI assistants. “Forma” is the application's short name. Free for personal, non-commercial use; commercial use follows the [terms](LICENSE.txt).

**[Microsoft Store](https://apps.microsoft.com/detail/9MW9G4MGBXZL) · [Official website](https://congestedai.github.io/Forma/) · [GitHub downloads](https://github.com/congestedai/Forma/releases) · [Install with a command](docs/INSTALACAO.md#macos-and-linux-command-line) · [Installation](docs/INSTALACAO.md) · [MCP](docs/MCP.md) · [Themes](docs/TEMAS.md)**

This repository contains official downloads, release notes, documentation, issue reports and distribution validation scripts. The original application source code is private. This repository does not grant an open-source license for the application.

## Downloads

Animation is experimental. For now, the most practical way to set up motion is with an AI agent connected through MCP. We are improving manual setup in the interface to make it simpler and more intuitive.

| Distribution | Requirements |
| --- | --- |
| [Microsoft Store — 0.7.1.0](https://apps.microsoft.com/detail/9MW9G4MGBXZL) | Windows 10/11 x64. Install and manage updates through the Store. |
| Windows x64 portable | Run the executable; Node.js is not required. Preserve the adjacent `Forma-data` folder when updating. |
| Command-line package (.tgz) | Node.js 22.12 or newer; includes the compiled browser application and MCP bridge. |

Downloads and `SHA256SUMS.txt` are attached to each [release](https://github.com/congestedai/Forma/releases). **[Alien Forma 0.7.0 Preview — Assemblies in motion](https://github.com/congestedai/Forma/releases/tag/v0.7.0-preview.rc7)** adds a dedicated Animation workspace, joint keyframes, coordinated poses, sampled inspection and a more direct MCP workflow. It also improves complex-assembly opening/editing, camera and selection control, motion captures and everyday project operations.

**Maintenance build, 10 November 2026:** GitHub **0.7.3** in the existing 0.7 release; Microsoft Store **0.7.1.0 available**, with **0.7.3.0 submitted for separate certification**. This patch fixes Store MCP setup without an external Node.js installation. Check [versions and channels](docs/VERSOES.md). Windows x64 portable and embedded-Node MCP checks passed for 0.7.3. [The original 0.7.0 CLI installation and basic MCP modeling/capture/export/save-reopen checks passed on Linux x64, macOS Intel and Apple Silicon](https://github.com/congestedai/Forma/actions/runs/42731199567).

![Robotic arm in the actual Alien Forma viewport](docs/assets/robot-arm-hero.png)

![Square near the floor followed by a raised circle](docs/assets/robot-arm-square-circle-loop.gif)

[Explore 0.7.0](https://congestedai.github.io/Forma/updates/0.7.0.html) · [Technical drawing PDF](docs/assets/robot-arm-general-arrangement.pdf)

The motion overlay is a presentation annotation. The arm and drawing are digital design studies, not physically certified mechanisms or complete fabrication instructions. Structural analysis is experimental and requires external supported solver components; these are not bundled in the public downloads. Native sheets retain some Portuguese labels.

## Earlier design examples

The F1 v20 study contains **70 bodies and 634 history nodes**, with image-derived markings, hardware details and technical views. Its A3 general arrangement uses third-angle projection, orthographic views at 1:2 and an isometric view at 1:5. [View the drawing PDF](docs/assets/f1-v20-general-arrangement.pdf) or [explore the screenshots](https://congestedai.github.io/Forma/#drawings). The native export retains some Portuguese labels. This is a CAD design example, not a physically validated RC-car kit or complete fabrication documentation.

Additional examples demonstrate foldable 3D boxes, rigid boxes with separate lids, foldable laser plans with distinct vector cut/score lines, and an image-derived three-color keychain. Assembled packaging poses are digital previews; material settings and hinge durability need physical testing.

![One kraft folding mailer, flat and assembled](docs/assets/packaging-kraft.png)

Kraft packaging: AI-finished presentation based on a real native Alien Forma capture. The [original viewport image](docs/assets/packaging-kraft-viewport.png) is also available. This is a digital design example, not a physically validated carton.

The current releases are **previews**. No stable release has been published yet. Read the release notes for known limitations.

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

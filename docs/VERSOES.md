# Release channels

- **Stable:** tagged `vMAJOR.MINOR.PATCH`, published after distribution validation. `/releases/latest` points to the most recent stable release once one exists.
- **Preview:** a version with a prerelease suffix, marked **Pre-release**. It can include known limitations and does not automatically replace a stable release.

No stable release has been published yet.

## Microsoft Store and GitHub

| Channel | Version, updated 6 November 2026 | Download |
| --- | --- | --- |
| Microsoft Store, Windows x64 | **0.6.8.0 available** · **0.6.9.0 in certification** | [Install from Microsoft Store](https://apps.microsoft.com/detail/9MW9G4MGBXZL) |
| GitHub preview, portable and CLI | **0.6.9-preview.20261106** | [Release downloads and notes](https://github.com/congestedai/Forma/releases/tag/v0.6.9-preview.20261106) |

New previews arrive on **GitHub first**; Store updates follow Microsoft's review and may arrive later. Microsoft published Store 0.6.8.0 on 4 November 2026. Compare version numbers rather than assuming either channel is always newer. Store availability does not certify every CAD tool or establish a new Stable channel.

Each release includes notes, downloads and `SHA256SUMS.txt`. Current asset names are `Forma-windows-x64-portable.exe` and `Forma-cli.tgz`. The release tag identifies their version. Existing names are retained for compatibility.

Notes distinguish checked platforms, measured improvements and known limitations. Performance targets and universal compatibility are not claimed without supporting evidence. The original application source and development history are private.

## Current preview

[0.6.9-preview.20261106](https://github.com/congestedai/Forma/releases/tag/v0.6.9-preview.20261106) adds lighting and material controls, MCP raster tracing, SVG positioning, Sketch reference calibration, Pocket limits, three-point arcs and 3MF inspection. Windows x64 passed portable and CLI smoke tests. [Linux x64 and both macOS architectures passed CLI and browser smoke tests for this exact download](https://github.com/congestedai/Forma/actions/runs/42278917809).

## Previous previews

[0.6.8-preview.20261103-rc3](https://github.com/congestedai/Forma/releases/tag/v0.6.8-preview.20261103-rc3) consolidates recent modeling, technical drawing, packaging and visible MCP work. It corrects thin hinged-lid box defaults and paint-stroke confirmation. Launch materials use the actual F1 v20 (70 bodies, 634 nodes), an A3 general arrangement, packaging and a multicolor keychain. These are digital examples, not physical fabrication or performance certification. Technical exports retain some Portuguese labels. Windows checks identify the final portable and CLI; [CLI/browser checks for this exact package passed on Linux x64, Mac Intel and Apple Silicon](https://github.com/congestedai/Forma/actions/runs/41769993463), using Node.js 22.12.0. No Mac/Linux Electron distribution is supplied.

[0.6.3-preview.20261101](https://github.com/congestedai/Forma/releases/tag/v0.6.3-preview.20261101) adds a compact wordmark, Windows product metadata and icon, and Microsoft Store packaging preparation. The GitHub portable remains unsigned; Store availability does not sign that separate executable. Historical Store release: 0.6.4.0, superseded by 0.6.8.0. [Native installation and basic CAD checks](https://github.com/congestedai/Forma/actions/runs/41343434811) passed for the GitHub 0.6.3 package on Linux x64 and both Mac architectures.

[0.6.2-preview.20261101](https://github.com/congestedai/Forma/releases/tag/v0.6.2-preview.20261101) introduces eight local interface languages and automatic detection, the Alien Forma product name, and an MCP automation-language correction. 0.6.1 is superseded because its MCP browser startup can fail on non-Portuguese systems. Published assets are preserved unchanged.

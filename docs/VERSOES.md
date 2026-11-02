# Release channels

- **Stable:** tagged `vMAJOR.MINOR.PATCH`, published after distribution validation. `/releases/latest` points to the most recent stable release once one exists.
- **Preview:** a version with a prerelease suffix, marked **Pre-release**. It can include known limitations and does not automatically replace a stable release.

No stable release has been published yet.

## Microsoft Store and GitHub

| Channel | Available version, checked 2 November 2026 | Download |
| --- | --- | --- |
| Microsoft Store, Windows x64 | **0.6.4.0** | [Install from Microsoft Store](https://apps.microsoft.com/detail/9MW9G4MGBXZL) |
| GitHub preview, portable and CLI | **0.6.3-preview.20261101** | [Release downloads and notes](https://github.com/congestedai/Forma/releases/tag/v0.6.3-preview.20261101) |

New preview builds will be published on **GitHub first**; Store updates follow Microsoft's review and may arrive later. The Store is currently ahead of the GitHub download. Compare the version numbers rather than assuming either channel is always newer. Local development candidates are not public releases. Store availability does not certify every CAD tool or establish a new Stable channel.

Each release includes notes, downloads and `SHA256SUMS.txt`. Current asset names are `Forma-windows-x64-portable.exe` and `Forma-cli.tgz`. The release tag identifies their version. Existing names are retained for compatibility.

Notes distinguish checked platforms, measured improvements and known limitations. Performance targets and universal compatibility are not claimed without supporting evidence. The original application source and development history are private.

## Current preview

[0.6.3-preview.20261101](https://github.com/congestedai/Forma/releases/tag/v0.6.3-preview.20261101) adds a compact wordmark, Windows product metadata and icon, and Microsoft Store packaging preparation. The GitHub portable remains unsigned; Store availability does not sign that separate executable. The Store edition is now available as 0.6.4.0 using the link above. [Native installation and basic CAD checks](https://github.com/congestedai/Forma/actions/runs/41343434811) passed for the GitHub 0.6.3 package on Linux x64 and both Mac architectures.

[0.6.2-preview.20261101](https://github.com/congestedai/Forma/releases/tag/v0.6.2-preview.20261101) introduces eight local interface languages and automatic detection, the Alien Forma product name, and an MCP automation-language correction. 0.6.1 is superseded because its MCP browser startup can fail on non-Portuguese systems. Published assets are preserved unchanged.

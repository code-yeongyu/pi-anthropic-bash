# pi-anthropic-bash

[![ci](https://github.com/code-yeongyu/pi-anthropic-bash/actions/workflows/ci.yml/badge.svg)](https://github.com/code-yeongyu/pi-anthropic-bash/actions/workflows/ci.yml) [![license: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Anthropic native bash extension for the [pi coding agent](https://github.com/badlogic/pi-mono/tree/main/packages/coding-agent).

This package is the standalone extraction of senpi's former builtin `anthropic-bash` extension.

## Behavior

The extension does not register a new tool. It intercepts Anthropic requests before they are sent and ensures a native `bash_*` tool is present for `anthropic-messages` payloads only when bash support is explicitly enabled.

| Case | Result |
|------|--------|
| `PI_ANTHROPIC_BASH` is enabled, API is `anthropic-messages`, and no native `bash_*` tool exists | injects `{ type: "bash_20250124", name: "bash" }` |
| `PI_ANTHROPIC_BASH` is enabled and a native `bash_*` tool already exists | preserves existing native tool (no duplication) |
| `PI_ANTHROPIC_BASH` is enabled and a function variant named `bash` is present | strips function variant and keeps/uses native variant |
| `PI_ANTHROPIC_BASH` is disabled or unset | no-op |
| API is non-Anthropic | no-op |

Truthy values for `PI_ANTHROPIC_BASH` are: `1`, `true`, `yes`, `on` (case-insensitive, surrounding whitespace allowed).

It also appends a system-prompt section for Anthropic sessions indicating native `bash_20250124` availability when enabled. The tool remains stateless and the `restart` flag has no effect.

## Installation

The package targets the [`pi`](https://github.com/badlogic/pi-mono/tree/main/packages/coding-agent) coding agent. Pi loads extensions from `~/.pi/agent/extensions/`, project `.pi/extensions/`, or via the `--extension` / `-e` CLI flag.

```bash
# From npm (once published)
pi install npm:pi-anthropic-bash

# From git
pi install git:github.com/code-yeongyu/pi-anthropic-bash

# Manual placement
git clone https://github.com/code-yeongyu/pi-anthropic-bash ~/.pi/agent/extensions/pi-anthropic-bash
cd ~/.pi/agent/extensions/pi-anthropic-bash && npm install

# Dev / one-shot test
pi -e /path/to/pi-anthropic-bash/src/index.ts
```

After installation, restart pi or run `/reload` inside an interactive session.

## Development

```bash
npm install
npm test
npm run typecheck
npm run check
pi -e ./src/index.ts
```

The test suite uses vitest. TypeScript is strict, Node-only, and uses ESM imports with `.js` suffixes.

## Origin

Ported from `packages/coding-agent/src/core/extensions/builtin/anthropic-bash/index.ts` in `code-yeongyu/senpi-mono`.

## License

[MIT](LICENSE).

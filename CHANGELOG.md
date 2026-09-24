# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.1] - 2026-09-24

### Changed

- Migrated peer dependencies from the retired `@mariozechner/pi-*` scope to `@earendil-works/pi-ai` and `@earendil-works/pi-coding-agent` (`*`).
- Pinned development toolchain: `@biomejs/biome` 2.5.14, `vitest` 5.0.1, `typescript` 7.0.2, `@types/node` 26.6.2, `@typescript/native-preview` 7.0.0-dev.20260707.2.
- Added exact `@earendil-works/pi-ai` and `@earendil-works/pi-coding-agent` 0.87.1 as devDependencies so tests typecheck against the current upstream runtime.
- Raised `engines.node` to `>=22.19.0`.
- Added GitHub Actions CI on Bun 1.4.2 (`ubuntu-latest` / `macos-latest` × Node 22 / 24) plus an `npm-consumer` smoke job.

## [0.1.0] - 2026-05-07

### Added

- Initial release. Native Anthropic bash policy extension for the pi coding agent. Injects `bash_20250124` into anthropic-messages requests when `PI_ANTHROPIC_BASH` is enabled.

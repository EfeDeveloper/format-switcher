# Change Log

All notable changes to the "format-switcher" extension will be documented in this file.

Format follows [Keep a Changelog](https://keepachangelog.com/).

## [Unreleased]

## [1.0.0] - 2026-03-08

### Added

- **Two new formats**: `lower words` (space-separated lowercase) and `UPPER WORDS` (space-separated uppercase).
- **Cycle command** (`extension.formatSwitcher.cycleCase`) — automatically detects the current format and advances to the next in the cycle: `camelCase → snake_case → kebab-case → CONSTANT_CASE → Train-Case → lower words → UPPER WORDS → camelCase`.
- **Keyboard shortcut** `Ctrl+Shift+F` mapped to the cycle command (only active when editor has a selection, avoiding conflicts with "Find in Files").
- **Multi-cursor support** — all active selections are converted simultaneously.
- `LICENSE` file (MIT).
- GitHub Actions CI pipeline (lint → build → test).

### Changed

- Replaced `lodash` runtime dependency (~4.7 MB) with native TypeScript implementations, reducing the packaged extension size by over 95%.
- Case conversion logic extracted to a standalone `caseConverters` module for testability.
- Comprehensive unit test suite (40+ assertions) replacing the placeholder boilerplate.

### Fixed

- Context menu submenu now only appears when text is actually selected (`when: editorHasSelection`).
- Internal `CaseType` literal `'Constant case'` corrected to `'upperSnakeCase'` for consistency.

## [0.2.0] - 2024-01-01

### Added

- Initial release with five case conversions: `camelCase`, `snake_case`, `CONSTANT_CASE`, `kebab-case`, `Train-Case`.
- Right-click context menu submenu "Change case".
- `lodash` used internally for text segmentation.

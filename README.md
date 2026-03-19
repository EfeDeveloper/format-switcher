<div align="center">
  <img src="./images/icon.png" alt="logo" width="100" />

  <h1>Format Switcher</h1>

[![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/EdFerVIIIA.format-switcher)](https://marketplace.visualstudio.com/items?itemName=EdFerVIIIA.format-switcher)
[![CI](https://github.com/EfeDeveloper/format-switcher/actions/workflows/ci.yml/badge.svg)](https://github.com/EfeDeveloper/format-switcher/actions/workflows/ci.yml)

</div>

## Table of contents

1. [Features](#features)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Keyboard Shortcut](#keyboard-shortcut)
5. [Contributing](#contributing)
6. [License](#license)

## Features

`Format Switcher` is a VS Code extension that transforms selected text between seven naming-convention formats via the right-click context menu or a keyboard shortcut.

Supported formats:

```
camelCase
snake_case
CONSTANT_CASE
kebab-case
Train-Case
lower words
UPPER WORDS
```

- **Multi-cursor support** — all active selections are converted simultaneously.
- **Context menu** only appears when text is selected (no more silent no-ops).

## Installation

**From the Marketplace:**

1. Open VS Code
2. Press `Ctrl+P` and run: `ext install EdFerVIIIA.format-switcher`
3. Or search **"Format Switcher"** in the Extensions view (`Ctrl+Shift+X`)

**From a VSIX file:**

```
code --install-extension format-switcher-<version>.vsix
```

## Usage

Select any text, right-click, and choose **Change case** → pick the desired format.

## Keyboard Shortcut

Press **`Alt+Shift+L`** with text selected to **cycle** through formats in order:

```
camelCase → snake_case → kebab-case → CONSTANT_CASE → Train-Case → lower words → UPPER WORDS → camelCase → …
```

The shortcut only activates when the cursor is inside the editor with a selection. You can customise the keybinding any time via **File → Preferences → Keyboard Shortcuts**.

## Contributing

Bug reports and feature requests are welcome — please [open an issue](https://github.com/EfeDeveloper/format-switcher/issues).

Pull requests are also welcome. To get started:

```bash
git clone https://github.com/EfeDeveloper/format-switcher.git
cd format-switcher
npm install
npm test
```

Press **F5** in VS Code to launch the Extension Development Host, or use the **"Extension Tests"** launch config to debug tests.

## License

[MIT](LICENSE) © EfeDeveloper

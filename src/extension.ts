import * as vscode from 'vscode';
import {
  CaseType,
  CYCLE_ORDER,
  CONVERTERS,
  detectCase,
  toLowerWords,
  toUpperWords,
  toCamelCase,
  toSnakeCase,
  toUpperSnakeCase,
  toKebabCase,
  toTrainCase,
} from './caseConverters';

export function activate(context: vscode.ExtensionContext): void {
  context.subscriptions.push(
    vscode.commands.registerCommand('extension.formatSwitcher.lowerWords', () =>
      applyCase((text) => toLowerWords(text)),
    ),
    vscode.commands.registerCommand('extension.formatSwitcher.upperWords', () =>
      applyCase((text) => toUpperWords(text)),
    ),
    vscode.commands.registerCommand('extension.formatSwitcher.camelCase', () =>
      applyCase((text) => toCamelCase(text)),
    ),
    vscode.commands.registerCommand('extension.formatSwitcher.snakeCase', () =>
      applyCase((text) => toSnakeCase(text)),
    ),
    vscode.commands.registerCommand('extension.formatSwitcher.upperSnakeCase', () =>
      applyCase((text) => toUpperSnakeCase(text)),
    ),
    vscode.commands.registerCommand('extension.formatSwitcher.kebabCase', () =>
      applyCase((text) => toKebabCase(text)),
    ),
    vscode.commands.registerCommand('extension.formatSwitcher.trainCase', () =>
      applyCase((text) => toTrainCase(text)),
    ),
    vscode.commands.registerCommand('extension.formatSwitcher.cycleCase', () =>
      applyCase((text) => cycleConvert(text)),
    ),
  );
}

/**
 * Applies a conversion function to every active selection in the editor.
 * Supports multi-cursor. Skips empty selections with a status bar hint.
 */
async function applyCase(convert: (text: string) => string): Promise<void> {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return;
  }

  const selections = editor.selections;
  const allEmpty = selections.every((s) => s.isEmpty);

  if (allEmpty) {
    vscode.window.setStatusBarMessage('$(warning) Select text first', 3000);
    return;
  }

  await editor.edit((editBuilder) => {
    for (const selection of selections) {
      if (selection.isEmpty) {
        continue;
      }
      const text = editor.document.getText(selection);
      editBuilder.replace(selection, convert(text));
    }
  });
}

/**
 * Given some text, detects its current case format and returns the next
 * one in the cycle order. Falls back to camelCase when undetected.
 */
function cycleConvert(text: string): string {
  const current = detectCase(text);
  const currentIndex = current === null ? -1 : CYCLE_ORDER.indexOf(current);
  const nextType: CaseType = CYCLE_ORDER[(currentIndex + 1) % CYCLE_ORDER.length];
  return CONVERTERS[nextType](text);
}

export function deactivate(): void {}

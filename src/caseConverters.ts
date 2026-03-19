export type CaseType =
  | 'lowerWords'
  | 'upperWords'
  | 'camelCase'
  | 'snakeCase'
  | 'upperSnakeCase'
  | 'kebabCase'
  | 'trainCase';

/** Ordered cycle: each Alt+Shift+L advances to the next format */
export const CYCLE_ORDER: CaseType[] = [
  'camelCase',
  'snakeCase',
  'kebabCase',
  'upperSnakeCase',
  'trainCase',
  'lowerWords',
  'upperWords',
];

/**
 * Splits any cased string into an array of lowercase word tokens.
 * Handles: camelCase, PascalCase, snake_case, UPPER_SNAKE, kebab-case,
 * Train-Case, plain spaces, and digits adjacent to letters (e.g. hello2World).
 */
function segmentWords(text: string): string[] {
  // Insert a separator before transitions: lowercase→uppercase, digit→letter,
  // letter→digit, and consecutive uppercase followed by lowercase (ABCDef → ABC Def).
  const spaced = text
    .replace(/([a-z\d])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .replace(/([a-zA-Z])(\d)/g, '$1 $2')
    .replace(/(\d)([a-zA-Z])/g, '$1 $2');

  return spaced
    .split(/[\s\-_]+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 0);
}

// ─── Converters ──────────────────────────────────────────────────────────────

/** Splits into words and joins with spaces, all lowercase. */
export function toLowerWords(text: string): string {
  const words = segmentWords(text);
  if (words.length === 0) {
    return text;
  }
  return words.map((w) => w.toLowerCase()).join(' ');
}

export function toCamelCase(text: string): string {
  const words = segmentWords(text);
  if (words.length === 0) {
    return text;
  }
  return words
    .map((w, i) =>
      i === 0 ? w.toLowerCase() : w[0].toUpperCase() + w.slice(1).toLowerCase(),
    )
    .join('');
}

export function toSnakeCase(text: string): string {
  const words = segmentWords(text);
  if (words.length === 0) {
    return text;
  }
  return words.map((w) => w.toLowerCase()).join('_');
}

export function toUpperSnakeCase(text: string): string {
  const words = segmentWords(text);
  if (words.length === 0) {
    return text;
  }
  return words.map((w) => w.toUpperCase()).join('_');
}

export function toKebabCase(text: string): string {
  const words = segmentWords(text);
  if (words.length === 0) {
    return text;
  }
  return words.map((w) => w.toLowerCase()).join('-');
}

export function toUpperWords(text: string): string {
  const words = segmentWords(text);
  if (words.length === 0) {
    return text;
  }
  return words.map((w) => w.toUpperCase()).join(' ');
}

export function toTrainCase(text: string): string {
  const words = segmentWords(text);
  if (words.length === 0) {
    return text;
  }
  return words.map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase()).join('-');
}

// ─── Detection ───────────────────────────────────────────────────────────────

/**
 * Detects the case format of a single token (no spaces).
 * Returns null if the text doesn't clearly match any supported format,
 * or if it's a single word with no separators (ambiguous).
 */
export function detectCase(text: string): CaseType | null {
  const t = text.trim();
  if (!t) {
    return null;
  }

  // Space-separated formats (checked before no-space formats)
  if (/^[a-z\d]+( [a-z\d]+)+$/.test(t)) {
    return 'lowerWords';
  }
  if (/^[A-Z\d]+( [A-Z\d]+)+$/.test(t)) {
    return 'upperWords';
  }

  if (/\s/.test(t)) {
    return null;
  }

  if (/^[a-z][a-z\d]*([A-Z][a-z\d]*)+$/.test(t)) {
    return 'camelCase';
  }
  if (/^[A-Z][a-z\d]*([A-Z][a-z\d]*)+$/.test(t)) {
    return 'camelCase';
  } // PascalCase → treat as camelCase for cycling
  if (/^[a-z\d]+(_[a-z\d]+)+$/.test(t)) {
    return 'snakeCase';
  }
  if (/^[A-Z\d]+(_[A-Z\d]+)+$/.test(t)) {
    return 'upperSnakeCase';
  }
  if (/^[a-z\d]+(-[a-z\d]+)+$/.test(t)) {
    return 'kebabCase';
  }
  if (/^[A-Z][a-z\d]*(-[A-Z][a-z\d]*)+$/.test(t)) {
    return 'trainCase';
  }

  return null;
}

// ─── Converter map ───────────────────────────────────────────────────────────

export const CONVERTERS: Record<CaseType, (text: string) => string> = {
  lowerWords: toLowerWords,
  upperWords: toUpperWords,
  camelCase: toCamelCase,
  snakeCase: toSnakeCase,
  upperSnakeCase: toUpperSnakeCase,
  kebabCase: toKebabCase,
  trainCase: toTrainCase,
};

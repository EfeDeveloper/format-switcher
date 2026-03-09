import * as assert from 'assert';
import {
  toCamelCase,
  toSnakeCase,
  toUpperSnakeCase,
  toKebabCase,
  toTrainCase,
  toLowerWords,
  toUpperWords,
  detectCase,
  CYCLE_ORDER,
  CONVERTERS,
} from '../caseConverters';

// ─── toLowerWords ──────────────────────────────────────────────────────────────
suite('toLowerWords', () => {
  test('camelCase input', () =>
    assert.strictEqual(toLowerWords('helloWorld'), 'hello world'));
  test('snake_case input', () =>
    assert.strictEqual(toLowerWords('hello_world'), 'hello world'));
  test('UPPER_SNAKE input', () =>
    assert.strictEqual(toLowerWords('HELLO_WORLD'), 'hello world'));
  test('kebab-case input', () =>
    assert.strictEqual(toLowerWords('hello-world'), 'hello world'));
  test('Train-Case input', () =>
    assert.strictEqual(toLowerWords('Hello-World'), 'hello world'));
  test('already lower words', () =>
    assert.strictEqual(toLowerWords('hello world'), 'hello world'));
  test('single word', () => assert.strictEqual(toLowerWords('hello'), 'hello'));
  test('empty string', () => assert.strictEqual(toLowerWords(''), ''));
});

// ─── toUpperWords ──────────────────────────────────────────────────────────────
suite('toUpperWords', () => {
  test('plain words', () =>
    assert.strictEqual(toUpperWords('hello world'), 'HELLO WORLD'));
  test('camelCase input', () =>
    assert.strictEqual(toUpperWords('helloWorld'), 'HELLO WORLD'));
  test('snake_case input', () =>
    assert.strictEqual(toUpperWords('hello_world'), 'HELLO WORLD'));
  test('kebab-case input', () =>
    assert.strictEqual(toUpperWords('hello-world'), 'HELLO WORLD'));
  test('already UPPER WORDS', () =>
    assert.strictEqual(toUpperWords('HELLO WORLD'), 'HELLO WORLD'));
  test('single word', () => assert.strictEqual(toUpperWords('hello'), 'HELLO'));
  test('empty string', () => assert.strictEqual(toUpperWords(''), ''));
});

// ─── toCamelCase ──────────────────────────────────────────────────────────────
suite('toCamelCase', () => {
  test('plain words', () => assert.strictEqual(toCamelCase('hello world'), 'helloWorld'));
  test('snake_case input', () =>
    assert.strictEqual(toCamelCase('hello_world'), 'helloWorld'));
  test('kebab-case input', () =>
    assert.strictEqual(toCamelCase('hello-world'), 'helloWorld'));
  test('UPPER_SNAKE input', () =>
    assert.strictEqual(toCamelCase('HELLO_WORLD'), 'helloWorld'));
  test('already camelCase', () =>
    assert.strictEqual(toCamelCase('helloWorld'), 'helloWorld'));
  test('PascalCase input', () =>
    assert.strictEqual(toCamelCase('HelloWorld'), 'helloWorld'));
  test('Train-Case input', () =>
    assert.strictEqual(toCamelCase('Hello-World'), 'helloWorld'));
  test('single word', () => assert.strictEqual(toCamelCase('hello'), 'hello'));
  test('empty string', () => assert.strictEqual(toCamelCase(''), ''));
  test('numbers adjacent to letters', () =>
    assert.strictEqual(toCamelCase('hello2world'), 'hello2World'));
});

// ─── toSnakeCase ──────────────────────────────────────────────────────────────
suite('toSnakeCase', () => {
  test('plain words', () =>
    assert.strictEqual(toSnakeCase('hello world'), 'hello_world'));
  test('camelCase input', () =>
    assert.strictEqual(toSnakeCase('helloWorld'), 'hello_world'));
  test('kebab-case input', () =>
    assert.strictEqual(toSnakeCase('hello-world'), 'hello_world'));
  test('UPPER_SNAKE input', () =>
    assert.strictEqual(toSnakeCase('HELLO_WORLD'), 'hello_world'));
  test('already snake_case', () =>
    assert.strictEqual(toSnakeCase('hello_world'), 'hello_world'));
  test('single word', () => assert.strictEqual(toSnakeCase('hello'), 'hello'));
  test('empty string', () => assert.strictEqual(toSnakeCase(''), ''));
  test('numbers adjacent to letters', () =>
    assert.strictEqual(toSnakeCase('helloWorld2Test'), 'hello_world_2_test'));
});

// ─── toUpperSnakeCase ─────────────────────────────────────────────────────────
suite('toUpperSnakeCase', () => {
  test('plain words', () =>
    assert.strictEqual(toUpperSnakeCase('hello world'), 'HELLO_WORLD'));
  test('camelCase input', () =>
    assert.strictEqual(toUpperSnakeCase('helloWorld'), 'HELLO_WORLD'));
  test('kebab-case input', () =>
    assert.strictEqual(toUpperSnakeCase('hello-world'), 'HELLO_WORLD'));
  test('snake_case input', () =>
    assert.strictEqual(toUpperSnakeCase('hello_world'), 'HELLO_WORLD'));
  test('already UPPER_SNAKE', () =>
    assert.strictEqual(toUpperSnakeCase('HELLO_WORLD'), 'HELLO_WORLD'));
  test('single word', () => assert.strictEqual(toUpperSnakeCase('hello'), 'HELLO'));
  test('empty string', () => assert.strictEqual(toUpperSnakeCase(''), ''));
  test('numbers in identifier', () =>
    assert.strictEqual(toUpperSnakeCase('myVar2'), 'MY_VAR_2'));
});

// ─── toKebabCase ──────────────────────────────────────────────────────────────
suite('toKebabCase', () => {
  test('plain words', () =>
    assert.strictEqual(toKebabCase('hello world'), 'hello-world'));
  test('camelCase input', () =>
    assert.strictEqual(toKebabCase('helloWorld'), 'hello-world'));
  test('UPPER_SNAKE input', () =>
    assert.strictEqual(toKebabCase('HELLO_WORLD'), 'hello-world'));
  test('snake_case input', () =>
    assert.strictEqual(toKebabCase('hello_world'), 'hello-world'));
  test('already kebab-case', () =>
    assert.strictEqual(toKebabCase('hello-world'), 'hello-world'));
  test('single word', () => assert.strictEqual(toKebabCase('hello'), 'hello'));
  test('empty string', () => assert.strictEqual(toKebabCase(''), ''));
  test('Train-Case input', () =>
    assert.strictEqual(toKebabCase('Hello-World'), 'hello-world'));
});

// ─── toTrainCase ──────────────────────────────────────────────────────────────
suite('toTrainCase', () => {
  test('plain words', () =>
    assert.strictEqual(toTrainCase('hello world'), 'Hello-World'));
  test('camelCase input', () =>
    assert.strictEqual(toTrainCase('helloWorld'), 'Hello-World'));
  test('snake_case input', () =>
    assert.strictEqual(toTrainCase('hello_world'), 'Hello-World'));
  test('UPPER_SNAKE input', () =>
    assert.strictEqual(toTrainCase('HELLO_WORLD'), 'Hello-World'));
  test('kebab-case input', () =>
    assert.strictEqual(toTrainCase('hello-world'), 'Hello-World'));
  test('already Train-Case', () =>
    assert.strictEqual(toTrainCase('Hello-World'), 'Hello-World'));
  test('single word', () => assert.strictEqual(toTrainCase('hello'), 'Hello'));
  test('empty string', () => assert.strictEqual(toTrainCase(''), ''));
});

// ─── detectCase ───────────────────────────────────────────────────────────────
suite('detectCase', () => {
  test('detects camelCase', () =>
    assert.strictEqual(detectCase('helloWorld'), 'camelCase'));
  test('detects PascalCase as camelCase', () =>
    assert.strictEqual(detectCase('HelloWorld'), 'camelCase'));
  test('detects snake_case', () =>
    assert.strictEqual(detectCase('hello_world'), 'snakeCase'));
  test('detects UPPER_SNAKE', () =>
    assert.strictEqual(detectCase('HELLO_WORLD'), 'upperSnakeCase'));
  test('detects kebab-case', () =>
    assert.strictEqual(detectCase('hello-world'), 'kebabCase'));
  test('detects Train-Case', () =>
    assert.strictEqual(detectCase('Hello-World'), 'trainCase'));
  test('detects lower words', () =>
    assert.strictEqual(detectCase('hello world'), 'lowerWords'));
  test('detects UPPER WORDS', () =>
    assert.strictEqual(detectCase('HELLO WORLD'), 'upperWords'));
  test('single word returns null', () => assert.strictEqual(detectCase('hello'), null));
  test('empty string returns null', () => assert.strictEqual(detectCase(''), null));
});

// ─── Cycle order ──────────────────────────────────────────────────────────────
suite('CYCLE_ORDER and CONVERTERS', () => {
  test('CYCLE_ORDER has all 7 formats', () => assert.strictEqual(CYCLE_ORDER.length, 7));

  test('cycling camelCase → snakeCase', () => {
    const current = detectCase('helloWorld');
    assert.strictEqual(current, 'camelCase');
    const idx = CYCLE_ORDER.indexOf(current!);
    const next = CYCLE_ORDER[(idx + 1) % CYCLE_ORDER.length];
    assert.strictEqual(CONVERTERS[next]('helloWorld'), 'hello_world');
  });

  test('cycling snakeCase → kebabCase', () => {
    const current = detectCase('hello_world');
    assert.strictEqual(current, 'snakeCase');
    const idx = CYCLE_ORDER.indexOf(current!);
    const next = CYCLE_ORDER[(idx + 1) % CYCLE_ORDER.length];
    assert.strictEqual(CONVERTERS[next]('hello_world'), 'hello-world');
  });

  test('cycling kebabCase → upperSnakeCase', () => {
    const current = detectCase('hello-world');
    assert.strictEqual(current, 'kebabCase');
    const idx = CYCLE_ORDER.indexOf(current!);
    const next = CYCLE_ORDER[(idx + 1) % CYCLE_ORDER.length];
    assert.strictEqual(CONVERTERS[next]('hello-world'), 'HELLO_WORLD');
  });

  test('cycling upperSnakeCase → trainCase', () => {
    const current = detectCase('HELLO_WORLD');
    assert.strictEqual(current, 'upperSnakeCase');
    const idx = CYCLE_ORDER.indexOf(current!);
    const next = CYCLE_ORDER[(idx + 1) % CYCLE_ORDER.length];
    assert.strictEqual(CONVERTERS[next]('HELLO_WORLD'), 'Hello-World');
  });

  test('cycling trainCase → lowerWords', () => {
    const current = detectCase('Hello-World');
    assert.strictEqual(current, 'trainCase');
    const idx = CYCLE_ORDER.indexOf(current!);
    const next = CYCLE_ORDER[(idx + 1) % CYCLE_ORDER.length];
    assert.strictEqual(CONVERTERS[next]('Hello-World'), 'hello world');
  });

  test('cycling lowerWords → upperWords', () => {
    const current = detectCase('hello world');
    assert.strictEqual(current, 'lowerWords');
    const idx = CYCLE_ORDER.indexOf(current!);
    const next = CYCLE_ORDER[(idx + 1) % CYCLE_ORDER.length];
    assert.strictEqual(CONVERTERS[next]('hello world'), 'HELLO WORLD');
  });

  test('cycling upperWords → camelCase (wraps around)', () => {
    const current = detectCase('HELLO WORLD');
    assert.strictEqual(current, 'upperWords');
    const idx = CYCLE_ORDER.indexOf(current!);
    const next = CYCLE_ORDER[(idx + 1) % CYCLE_ORDER.length];
    assert.strictEqual(CONVERTERS[next]('HELLO WORLD'), 'helloWorld');
  });
});

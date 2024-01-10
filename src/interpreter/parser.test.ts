import { expect, test } from 'vitest'
import { parse } from './parser.ts';

test('parse Int', () => {
	const result = parse("45");
	expect(result).toStrictEqual([{ value: 45n, type: "Int" }]);
});

test('parse String', () => {
	const result = parse(`"Hello, World!"`);
	expect(result).toStrictEqual([{ value: "Hello, World!", type: "String"}]);
});

test("parse Bool", () => {
	const result = parse(`true`);
	expect(result).toStrictEqual([{ value: true, type: "Bool"}]);
});
import { expect, test } from 'vitest'
import { parse } from './parser.ts';
import { Right } from 'purify-ts';

test('parse Int', () => {
	const result = parse("45");
	expect(result).toStrictEqual(Right([{ value: 45n, type: "Int" }]));
});

test('parse String', () => {
	const result = parse(`"Hello, World!"`);
	expect(result).toStrictEqual(Right([{ value: "Hello, World!", type: "String"}]));
});

test("parse Module", () => {
	const result = parse(`{x = 5}`);
	expect(result).toStrictEqual(Right([{ value: new Map([[{name: "x"}, {value: 5n, type: "Int"}]]), type: "Module"}]));
})

test("parse Binding", () => {
	const result = parse("x = 5");
	expect(result).toStrictEqual(Right([ {name: {name: "x"}, value: {value: 5n, type: "Int"}, type: "Binding"}]))
})

test("parse Grouping", () => {
	const result = parse("(1,2,3)");
	expect(result).toStrictEqual(Right([{ type: "Grouping", expressions: [
		{type:"Int", value: 1n},{type:"Int", value: 2n},{type:"Int", value: 3n}
	]}]));
})

test("parse single name", () => {
	const result = parse("x");
	expect(result).toStrictEqual(Right([
		{
			type: "FieldPath", 
			value: { parts: [	
				{"name": "x"},
			]
		}}
	]));
})

test("parse field path", () => {
	const result = parse("x.y.z");
	expect(result).toStrictEqual(Right([
		{
			type: "FieldPath", 
			value: { parts: [	
				{"name": "x"},
				{"name": "y"},
				{"name": "z"},
			]
		}}
	]));
})

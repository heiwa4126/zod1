import { parseItemsJson } from "../src/item_schema.ts";
import { parseUserJson } from "../src/schema.ts";

function parseUserAndPrint(jsonString: string) {
	const result = parseUserJson(jsonString);

	if (!result.error) {
		console.log(result.user);
	} else {
		// ここが汚いのでなんとかしたい
		const errors = result.error;
		if (errors.formErrors.length > 0) {
			console.log({ form: errors.formErrors });
		} else {
			console.log(errors.fieldErrors);
		}
	}
}

function parseItemsAndPrint(jsonString: string) {
	const result = parseItemsJson(jsonString);

	if (!result.error) {
		console.log(result.user);
	} else {
		// ここが汚いのでなんとかしたい
		const errors = result.error;
		if (errors.formErrors.length > 0) {
			console.log({ form: errors.formErrors });
		} else {
			console.log(errors.fieldErrors);
		}
	}
}

parseUserAndPrint('{"name": "Alice"}');
parseUserAndPrint('{"name": 123}');
parseUserAndPrint('{"name": "Alice"');

parseItemsAndPrint('[{"id": 123456, "name": "Item1"}]');
parseItemsAndPrint(`[
	{"id": 123456, "name": "Item1"},
	{"id": -123456, "name": "Item2"},
	{"id": 12345, "name": "Item3"},
	{"id": 1234567, "name": "Item4"}
]`);

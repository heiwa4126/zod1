import { parseUserJson } from "../src/schema.ts";

function parseAndPrint(jsonString: string) {
	const result = parseUserJson(jsonString);

	if (!result.error) {
		console.log(result.user);
	} else {
		const errors = result.error;
		if (errors.formErrors.length > 0) {
			console.log({ formErrors: errors.formErrors });
		} else {
			console.log(errors.fieldErrors);
		}
	}
}

parseAndPrint('{"name": "Alice"}');
parseAndPrint('{"name": 123}');
parseAndPrint('{"name": "Alice"');

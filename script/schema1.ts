import { z } from "zod";
import { UserJsonSchema } from "../src/schema.ts";

function parseUserJson(jsonString: string) {
	const result = UserJsonSchema.safeParse(jsonString);

	if (result.success) {
		console.log(result.data);
	} else {
		const errors = z.flattenError(result.error);
		if (errors.formErrors.length > 0) {
			console.log({ formErrors: errors.formErrors });
		} else {
			console.log(errors.fieldErrors);
		}
	}
}

parseUserJson('{"name": "Alice"}');
parseUserJson('{"name": 123}');
parseUserJson('{"name": "Alice"');

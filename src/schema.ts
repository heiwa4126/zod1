import { z } from "zod";

const zJsonString = z.string().transform((str, ctx) => {
	try {
		return JSON.parse(str);
	} catch {
		ctx.addIssue({ code: "custom", message: "不正なJSONです" });
		return z.NEVER;
	}
});

type ParseJsonResult<TSchema extends z.ZodTypeAny> = {
	user: z.infer<TSchema>;
	error?: z.ZodFlattenedError<z.infer<TSchema>, string>;
};

function parseJsonWithSchema<TSchema extends z.ZodTypeAny>(
	jsonString: string,
	schema: TSchema
): ParseJsonResult<TSchema> {
	const result = zJsonString.pipe(schema).safeParse(jsonString);

	if (result.success) {
		return { user: result.data };
	}
	return { user: {} as z.infer<TSchema>, error: z.flattenError(result.error) };
}

export function parseJson<TSchema extends z.ZodTypeAny>(schema: TSchema) {
	return (jsonString: string): ParseJsonResult<TSchema> => {
		return parseJsonWithSchema(jsonString, schema);
	};
}

const UserSchema = z.object({
	name: z.string({
		error: (issue) =>
			issue.input === undefined ? "名前は必須です" : "名前は文字列で入力してください"
	})
});

export const parseUserJson = parseJson(UserSchema);

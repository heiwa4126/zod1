import { z } from "zod";

const zJsonString = z.string().transform((str, ctx) => {
	try {
		return JSON.parse(str);
	} catch {
		ctx.addIssue({ code: "custom", message: "不正なJSONです" });
		return z.NEVER;
	}
});

const UserSchema = z.object({
	name: z.string({
		error: (issue) =>
			issue.input === undefined ? "名前は必須です" : "名前は文字列で入力してください"
	})
});

const UserJsonSchema = zJsonString.pipe(UserSchema);

type User = z.infer<typeof UserSchema>;
type UserJsonError = z.ZodFlattenedError<User, string>;

interface UserOrErr {
	user: User;
	error?: UserJsonError;
}

export function parseUserJson(jsonString: string): UserOrErr {
	const result = UserJsonSchema.safeParse(jsonString);

	if (result.success) {
		return { user: result.data };
	}
	return { user: {} as User, error: z.flattenError(result.error) };
}

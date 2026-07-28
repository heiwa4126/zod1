import { z } from "zod";

const UserSchema = z.object({
	name: z.string({
		error: (issue) =>
			issue.input === undefined ? "名前は必須です" : "名前は文字列で入力してください"
	})
});

const zJsonString = z.string().transform((str, ctx) => {
	try {
		return JSON.parse(str);
	} catch {
		ctx.addIssue({ code: "custom", message: "不正なJSONです" });
		return z.NEVER;
	}
});

export const UserJsonSchema = zJsonString.pipe(UserSchema);
export type User = z.infer<typeof UserSchema>;

import { z } from "zod";
import { parseJson } from "./schema.ts";

const ItemSchema = z.object({
	id: z
		.number({
			error: (issue) => (issue.input === undefined ? "IDは必須です" : "IDは数値で入力してください")
		})
		.int({ message: "IDは整数で入力してください" })
		.positive({ message: "IDは正の値で入力してください" })
		.min(100000, { message: "IDは100000以上で入力してください" })
		.max(999999, { message: "IDは999999以下で入力してください" }),
	name: z.string({
		error: (issue) =>
			issue.input === undefined ? "名前は必須です" : "名前は文字列で入力してください"
	})
});

const ItemsSchema = z.array(ItemSchema).min(1, { message: "最低でも1件のアイテムが必要です" });

export const parseItemJson = parseJson(ItemSchema);
export const parseItemsJson = parseJson(ItemsSchema);

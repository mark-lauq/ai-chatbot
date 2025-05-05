import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";

export const chatTable = sqliteTable("chat", {
  id: text().$defaultFn(() => createId()),
  createdAt: text()
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  title: text().notNull(),
});

export type Chat = typeof chatTable.$inferSelect;
export type InsertChat = typeof chatTable.$inferInsert;

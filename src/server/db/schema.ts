import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";

enum Role {
  User = "user",
  AI = "ai",
}

export const chatTable = sqliteTable("chat", {
  id: text().$defaultFn(() => createId()),
  createdAt: text()
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  title: text().notNull(),
});

export type Chat = typeof chatTable.$inferSelect;
export type InsertChat = typeof chatTable.$inferInsert;

export const messageTable = sqliteTable("message", {
  id: text().$defaultFn(() => createId()),
  chatId: text().references(() => chatTable.id),
  role: text({ enum: [Role.User, Role.AI] }),
  parts: text({ mode: "json" }).$type<{
    type: "text";
    text: string;
  }>(),
});

export type Message = typeof messageTable.$inferSelect;
export type InsertMessage = typeof messageTable.$inferInsert;

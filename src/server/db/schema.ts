import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";
import type { Message as MessageType } from "ai";

export enum Role {
  User = "user",
  Assistant = "assistant",
}

export const chatTable = sqliteTable("chat", {
  id: text()
    .$defaultFn(() => createId())
    .notNull(),
  createdAt: text()
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  title: text().notNull(),
});

export type Chat = typeof chatTable.$inferSelect;
export type InsertChat = typeof chatTable.$inferInsert;

export const messageTable = sqliteTable("message", {
  id: text()
    .$defaultFn(() => createId())
    .notNull(),
  role: text({ enum: [Role.User, Role.Assistant] })
    .$type<MessageType["role"]>()
    .notNull(),
  content: text().notNull(),
});

export type Message = typeof messageTable.$inferSelect;
export type InsertMessage = typeof messageTable.$inferInsert;

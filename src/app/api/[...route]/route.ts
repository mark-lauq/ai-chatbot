import { Hono } from "hono";
import { handle } from "hono/vercel";
import { db } from "@/db";

export const dynamic = "force-dynamic";

const app = new Hono().basePath("/api");

app.get("/history", async (c) => {
  const chats = await db.query.chatTable.findMany();
  return c.json(chats);
});

export const GET = handle(app);

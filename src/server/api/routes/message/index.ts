import { Hono } from "hono";
import { db } from "@/server/db";
import { messageTable, type InsertMessage } from "@/server/db/schema";

const messageRoute = new Hono()
  .basePath("/message")
  .get("/", async (c) => {
    const messages = await db.query.messageTable.findMany();
    return c.json(messages);
  })
  .post("/", async (c) => {
    const body = await c.req.parseBody();
    try {
      await db.insert(messageTable).values(body as InsertMessage);
      return c.json({ ok: true }, 200);
    } catch (error) {
      console.error(error);
      return c.json({ ok: false }, 500);
    }
  });

export default messageRoute;

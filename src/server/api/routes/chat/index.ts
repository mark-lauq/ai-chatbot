import { Hono } from "hono";
import { db } from "@/db";

const chatRoute = new Hono()
  .basePath("/chat")
  .get("/", async (c) => {
    const chats = await db.query.chatTable.findMany();
    return c.json(chats);
  })
  .post("/", async (c) => {
    const body = await c.req.parseBody();
    console.log(`body`, body);
  });

export default chatRoute;

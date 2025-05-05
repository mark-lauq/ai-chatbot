import { Hono } from "hono";
import chatRoute from "./routes/chat";
import messageRoute from "./routes/message";

const app = new Hono().basePath("/api");

const routes = app.route("/", chatRoute).route("/", messageRoute);

export default app;

export type AppType = typeof routes;

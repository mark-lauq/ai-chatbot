import { Hono } from "hono";
import chatRoute from "./routes/chat";

const app = new Hono().basePath("/api");

const routes = app.route("/", chatRoute);

export default app;

export type AppType = typeof routes;

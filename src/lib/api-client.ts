import { AppType } from "@/server/api";
import { hc } from "hono/client";

const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.NEXT_PUBLIC_APP_URL!;

export const client = hc<AppType>(baseUrl);

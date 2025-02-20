import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import { userRoutes } from "./routes/user";
import dotenv from "dotenv";

dotenv.config();

const app = new Hono();

app.use(
  "/api/v1/*",
  cors({
    origin: process.env.ORIGIN!,
    credentials: true,
  })
);

app.route("/api/v1/user", userRoutes);

const PORT = process.env.PORT || 3000;

serve({
  fetch: app.fetch,
  port: Number(PORT),
});

console.log(`🚀 Server running at http://localhost:${PORT}`);

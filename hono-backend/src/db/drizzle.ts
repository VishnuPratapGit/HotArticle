import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in .env");
}

const connection = postgres(process.env.DATABASE_URL, { ssl: "require" });
export const db = drizzle(connection);
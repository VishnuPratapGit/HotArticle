import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  refreshToken: text("refreshToken"),
  categories: text("categories").array(),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").unique().notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  category_id: integer("category_id")
    .references(() => categories.id, { onDelete: "cascade" })
    .notNull(),
  title: text("title").unique(),
  link: text("link").unique(),
  snippet: text("snippet"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

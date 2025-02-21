import { db } from "../db/drizzle";
import { articles, categories, usersTable } from "../db/schema";
import { eq, inArray } from "drizzle-orm";
import { Context } from "hono";
import { z } from "zod";

const fetchArticles = async (c: Context) => {
  try {
    const user = c.get("user");

    if (!user || !user.id) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const page = Number(c.req.query("page")) || 1;
    const limit = 20;
    const offset = (page - 1) * limit;

    const [newuser] = await db
      .select({ categories: usersTable.categories })
      .from(usersTable)
      .where(eq(usersTable.email, user.email));

    if (!newuser.categories || newuser.categories.length === 0) {
      return c.json({ error: "select categories not found" }, 404);
    }

    const result = await db
      .select({
        category: categories.name,
        id: articles.id,
        title: articles.title,
        link: articles.link,
        snippet: articles.snippet,
        createdAt: articles.created_at,
      })
      .from(articles)
      .leftJoin(categories, eq(articles.category_id, categories.id))
      .where(inArray(categories.name, newuser.categories))
      .limit(limit)
      .offset(offset)
      .orderBy(articles.created_at);

    return c.json({ total: result.length, limit, page, data: result }, 200);
  } catch (error) {
    return c.json({ error: "Server Error" }, 500);
  }
};

const manageCategories = async (c: Context) => {
  try {
    const category = await c.req.text();

    const categorySchema = z.string().min(1, "category required");
    const parsedData = categorySchema.safeParse(category);
    if (!parsedData.success) {
      return c.json({ error: parsedData.error.format() }, 400);
    }

    const newCategory = await db
      .insert(categories)
      .values({ name: parsedData.data })
      .returning();

    return c.json(newCategory, 200);
  } catch (error) {
    return c.json({ error: "internal server error" }, 500);
  }
};

export { fetchArticles, manageCategories };

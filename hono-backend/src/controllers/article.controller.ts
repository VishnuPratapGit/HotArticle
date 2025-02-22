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

const multipleCategory = z.array(
  z
    .string()
    .toLowerCase()
    .refine((s) => !s.includes(" "), "No Spaces!")
);

const categorySchema = z
  .string()
  .min(1, "category required")
  .toLowerCase()
  .refine((s) => !s.includes(" "), "Don't Include Spaces!");

const multipleCategories = async (c: Context) => {
  try {
    const categoriesArr: string[] = await c.req.json();
    const parsedArrData = multipleCategory.safeParse(categoriesArr);
    if (!parsedArrData.success) {
      return c.json({ error: parsedArrData.error.format() }, 400);
    }

    const newData = parsedArrData.data.map((category: string) => ({
      name: category,
    }));

    const insertedRows = await db
      .insert(categories)
      .values(newData)
      .onConflictDoNothing()
      .returning();

    return c.json(insertedRows, 200);
  } catch (error) {
    return c.json({ error: "Internal Server Error" }, 500);
  }
};

const manageCategories = async (c: Context) => {
  try {
    const category = await c.req.text();
    const parsedCategory = categorySchema.safeParse(category);
    if (!parsedCategory.success) {
      return c.json({ error: parsedCategory.error.format() }, 400);
    }

    const checkPresence = await db
      .select()
      .from(categories)
      .where(eq(categories.name, parsedCategory.data));

    if (checkPresence.length > 0) {
      return c.json({ error: "Category already exists" }, 409);
    }

    const newCategory = await db
      .insert(categories)
      .values({ name: parsedCategory.data })
      .returning();

    return c.json(newCategory, 200);
  } catch (error) {
    return c.json({ error: "Internal server error" }, 500);
  }
};

const getAllCategories = async (c: Context) => {
  try {
    const allCategories = await db
      .select({ id: categories.id, name: categories.name })
      .from(categories);

    if (allCategories.length === 0) {
      return c.json({ error: "No Categories Found!" }, 404);
    }
    return c.json(allCategories, 200);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
};

export {
  fetchArticles,
  manageCategories,
  multipleCategories,
  getAllCategories,
};

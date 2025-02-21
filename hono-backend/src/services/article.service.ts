import { db } from "../db/drizzle";
import { articles, categories } from "../db/schema";
import { lt, sql } from "drizzle-orm";

export async function fetchAndStoreArticles() {
  try {
    console.log("⏳ Fetching new articles...");

    const allCategories = await db.select().from(categories);

    console.log(">> all categories fetched!", allCategories);

    if (allCategories.length === 0) {
      console.log("⚠️ No categories found.");
      return;
    }

    // Fetch articles for each category
    const categoryResults = await Promise.all(
      allCategories.map(async ({ id, name }) => {
        try {
          const category = encodeURIComponent(name);
          const key = process.env.SERPER_KEY;

          console.log(">> inside map: ", category, key, "\n");

          const response = await fetch(
            `https://google.serper.dev/search?q=${category}&location=India&gl=in&apiKey=${key}`
          );

          const data = await response.json();

          console.log(">> fetched api data:", data);

          if (!data || !data.organic) return [];

          return data.organic.map((article: any) => ({
            category_id: id,
            title: article.title,
            link: article.link,
            snippet: article.snippet,
            created_at: new Date(),
          }));
        } catch (error) {
          console.error(`❌ Error fetching articles for ${name}:`, error);
          return [];
        }
      })
    );

    console.log(">> outside map:", categoryResults);

    const allArticles = categoryResults.flat();

    console.log(">> afer flat all articles:", allArticles);

    if (allArticles.length > 0) {
      // await db
      //   .delete(articles)
      //   .where(lt(articles.created_at, sql`NOW() - INTERVAL '5 hours'`));
      await db.insert(articles).values(allArticles).onConflictDoNothing();
      console.log(`✅ Stored ${allArticles.length} articles.`);
    } else {
      console.log("⚠️ No new articles to store.");
    }
  } catch (error) {
    console.error("❌ Error in fetchAndStoreArticles:", error);
  }
}

import cron from "node-cron";
import { fetchAndStoreArticles } from "../services/article.service";

console.log("✅ Cron job started! Fetching articles every hour...");

// (async () => {
//   console.log("⏳ Fetching articles on startup...");
//   await fetchAndStoreArticles();
// })();

cron.schedule("0 * * * *", async () => {
  console.log("⏳ Running scheduled fetch...");
  await fetchAndStoreArticles();
  console.log("✅ Fetching complete!");
});

import { Hono } from "hono";

import { authMiddleware } from "../middleware/auth.middleware";
import {
  fetchArticles,
  manageCategories,
} from "../controllers/article.controller";

const articleRoutes = new Hono();

articleRoutes.get("/get", authMiddleware, fetchArticles);
articleRoutes.post("/add-category", manageCategories);

export default articleRoutes;

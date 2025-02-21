import { Hono } from "hono";

import { authMiddleware } from "../middleware/auth.middleware";
import {
  fetchArticles,
  manageCategories,
  multipleCategories,
} from "../controllers/article.controller";

const articleRoutes = new Hono();

articleRoutes.get("/get", authMiddleware, fetchArticles);
articleRoutes.post("/add-category", manageCategories);
articleRoutes.post("/add-multi-categories", multipleCategories);

export default articleRoutes;

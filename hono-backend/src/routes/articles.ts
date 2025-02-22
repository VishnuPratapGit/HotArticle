import { Hono } from "hono";

import { authMiddleware } from "../middleware/auth.middleware";
import {
  fetchArticles,
  getAllCategories,
  manageCategories,
  multipleCategories,
} from "../controllers/article.controller";

const articleRoutes = new Hono();

articleRoutes.get("/get", authMiddleware, fetchArticles);
articleRoutes.post("/add-category", manageCategories);
articleRoutes.post("/add-multi-categories", multipleCategories);
articleRoutes.get("/get-categories", getAllCategories);

export default articleRoutes;

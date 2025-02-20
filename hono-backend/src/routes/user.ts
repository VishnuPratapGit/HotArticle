import { Hono } from "hono";
import {
  getCurrentUser,
  userLogin,
  userLogout,
  userSignup,
} from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const userRoutes = new Hono();

userRoutes.post("/signup", userSignup);
userRoutes.post("/login", userLogin);
userRoutes.get("/logout", authMiddleware, userLogout);
userRoutes.get("/getuser", authMiddleware, getCurrentUser);

export { userRoutes };

import { db } from "../db/drizzle";
import { usersTable } from "../db/schema";
import { eq } from "drizzle-orm";
import { hash, compare } from "bcryptjs";
import { sign } from "hono/jwt";
import { z } from "zod";
import { Context } from "hono";
import dotenv from "dotenv";
import { setCookie, deleteCookie } from "hono/cookie";

dotenv.config();

type User = typeof usersTable.$inferSelect;
type TokenPair = {
  accessToken: string;
  refreshToken: string;
};

const generateTokens = async (user: User): Promise<TokenPair> => {
  const accessToken = await sign(
    {
      id: user.id,
      email: user.email,
      exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
    },
    process.env.ACCESS_TOKEN_SECRET!
  );

  const refreshToken = await sign(
    {
      id: user.id,
      exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
    },
    process.env.REFRESH_TOKEN_SECRET!
  );

  return { accessToken, refreshToken };
};

const userSignup = async (c: Context) => {
  try {
    const signupSchema = z.object({
      name: z.string().min(1, "Name is required"),
      email: z.string().email("Invalid email"),
      password: z.string().min(4, "Password must be at least 4 characters"),
      categories: z
        .array(z.string())
        .nonempty("At least one category is required"),
    });

    const body = await c.req.json();

    const parsedData = signupSchema.safeParse(body);

    if (!parsedData.success) {
      return c.json({ error: parsedData.error.format() }, 400);
    }

    const { name, email, password, categories } = parsedData.data;

    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (existingUser.length > 0) {
      return c.json({ error: "Email already registered" }, 409);
    }

    const hashedPassword = await hash(password, 10);

    const [newUser] = await db
      .insert(usersTable)
      .values({ name, email, password: hashedPassword, categories })
      .returning();

    return c.json(
      { message: "User created", user: { id: newUser.id, name, email } },
      201
    );
  } catch (error) {
    console.error("Signup Error:", error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
};

const userLogin = async (c: Context) => {
  try {
    const loginSchema = z.object({
      email: z.string().email("Invalid email"),
      password: z.string().min(1, "Password is required"),
    });

    const body = await c.req.json();

    const parsedData = loginSchema.safeParse(body);

    if (!parsedData.success) {
      return c.json({ error: parsedData.error.format() }, 400);
    }

    const { email, password } = parsedData.data;

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (!user) {
      return c.json({ error: "user not found" }, 404);
    }

    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      return c.json({ error: "Incorrect Password" }, 401);
    }

    const tokens = await generateTokens(user);

    const [updatedUserId]: { updatedId: number }[] = await db
      .update(usersTable)
      .set({ refreshToken: tokens.refreshToken })
      .where(eq(usersTable.email, email))
      .returning({ updatedId: usersTable.id });

    if (!updatedUserId) {
      return c.json({ error: "Saving Token Failed!" }, 400);
    }

    setCookie(c, "accessToken", tokens.accessToken, {
      path: "/",
      secure: false,
      httpOnly: true,
    });

    setCookie(c, "refreshToken", tokens.refreshToken, {
      path: "/",
      secure: false,
      httpOnly: true,
    });

    return c.json({ message: "Login Success", tokens }, 200);
  } catch (error) {
    console.error("Signup Error:", error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
};

const userLogout = async (c: Context) => {
  try {
    const user = c.get("user");

    if (!user || !user.id) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    await db
      .update(usersTable)
      .set({ refreshToken: null })
      .where(eq(usersTable.id, user.id));

    deleteCookie(c, "accessToken");
    deleteCookie(c, "refreshToken");

    return c.json({ message: "User logout successful" }, 200);
  } catch (error) {
    return c.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      500
    );
  }
};

const getCurrentUser = async (c: Context) => {
  try {
    const user = c.get("user");

    if (!user || !user.id) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const [newuser] = await db
      .select({
        id: usersTable.id,
        name: usersTable.name,
        email: usersTable.email,
      })
      .from(usersTable)
      .where(eq(usersTable.email, user.email));

    if (!newuser) {
      return c.json({ error: "user not found" }, 404);
    }

    return c.json({ ...newuser }, 200);
  } catch (error) {
    console.log(error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
};

export { userSignup, userLogin, userLogout, getCurrentUser };

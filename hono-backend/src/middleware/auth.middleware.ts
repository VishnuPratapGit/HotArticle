import { verify } from "hono/jwt";
import { Context, Next } from "hono";
import { getCookie } from "hono/cookie";

const authMiddleware = async (c: Context, next: Next) => {
  try {
    const accessToken = getCookie(c, "accessToken");

    if (!accessToken) {
      return c.json({ error: "unauthrised! token not found" }, 401);
    }

    const decodedPayload = await verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET!
    );

    c.set("user", decodedPayload);

    await next();
  } catch (error) {
    console.log(error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
};

export { authMiddleware };

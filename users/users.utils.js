import jwt from "jsonwebtoken";
import client from "../client";

export const getUser = async (token) => {
  try {
    if (!token) {
      return null;
    }
    const { id } = await jwt.verify(token, process.env.SECRET_KEY);
    const user = await client.user.findUnique({ where: { id } });

    if (user) {
      return user;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};

export const protectedResolver = (resolver) => (root, args, ctx, info) => {
  if (!ctx.loggedInUser) {
    return {
      ok: false,
      error: "Did Not Login.",
    };
  }
  return resolver(root, args, ctx, info);
};

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    login: async (_, { username, password }, { client }) => {
      const existedUser = await client.user.findUnique({ where: { username } });
      if (!existedUser) {
        return { ok: false, error: "Did't Exist User." };
      }
      const passwordOk = await bcrypt.compare(password, existedUser.password);
      if (!passwordOk) {
        return { ok: false, error: "Incorrect Password." };
      }

      const token = await jwt.sign(
        { id: existedUser.id },
        process.env.SECRET_KEY
      );

      return {
        ok: true,
        token,
      };
    },
  },
};

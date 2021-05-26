import client from "../client";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    createAccount: async (
      _,
      { username, email, name, location, avatarURL, githubUsername, password }
    ) => {
      const existedUser = await client.user.findFirst({
        where: {
          OR: [{ username }, { email }],
        },
      });
      if (existedUser) {
        return {
          ok: false,
          error: "ERROR! username/email is already existed.",
        };
      }

      const hashingPassword = await bcrypt.hash(password, 10);

      await client.user.create({
        data: {
          username,
          email,
          name,
          location,
          avatarURL,
          githubUsername,
          password: hashingPassword,
        },
      });

      return { ok: true };
    },
    deleteAccount: async (_, { username }) => {
      const existedUser = await client.user.findUnique({
        where: { username },
      });
      if (!existedUser) {
        return { ok: false, error: "ERROR! username is not existed" };
      }
      await client.user.delete({ where: { username } });
      return { ok: true };
    },
  },
};

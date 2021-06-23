import bcrypt from "bcrypt";
import { uploadToS3 } from "../../shared.utils";

export default {
  Mutation: {
    createAccount: async (
      _,
      { username, email, name, location, avatar, githubUsername, password },
      { client }
    ) => {
      const usersConunt = await client.user.count();
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
      let avatarURL = null;
      if (avatar) {
        avatarURL = await uploadToS3(avatar, usersConunt + 1, "avatar");
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
  },
};

import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        {
          username,
          email,
          name,
          location,
          avatarURL,
          githubUsername,
          password: newPassword,
        },
        { loggedInUser, client }
      ) => {
        let hashingPassword = null;

        if (newPassword) {
          hashingPassword = await bcrypt.hash(newPassword, 10);
        }

        const updatedUser = await client.user.update({
          where: { id: loggedInUser.id },
          data: {
            username,
            email,
            name,
            location,
            avatarURL,
            githubUsername,
            ...(newPassword && { password: hashingPassword }),
          },
        });

        if (updatedUser) {
          return { ok: true };
        } else {
          return { ok: false, error: "Can't Update User." };
        }
      }
    ),
  },
};

import bcrypt from "bcrypt";
import { uploadToS3 } from "../../shared.utils";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        {
          email,
          name,
          location,
          avatar,
          githubUsername,
          password: newPassword,
        },
        { loggedInUser, client }
      ) => {
        let avatarURL = null;
        let hashingPassword = null;

        if (newPassword) {
          hashingPassword = await bcrypt.hash(newPassword, 10);
        }

        if(avatar) {
          avatarURL = await uploadToS3(avatar, loggedInUser.id, "avatar");
        }

        const updatedUser = await client.user.update({
          where: { id: loggedInUser.id },
          data: {
            email,
            name,
            location,
            githubUsername,
            ...(avatarURL && { avatarURL }),
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

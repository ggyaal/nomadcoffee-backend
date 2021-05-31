import client from "../../client";
import { existUser, protectedResolver } from "../users.utils";

export default {
  Mutation: {
    unFollowing: protectedResolver(
      async (_, { username }, { loggedInUser }) => {
        if (!existUser(username))
          return { ok: false, error: "Don't exist User" };
        await client.user.update({
          where: { id: loggedInUser.id },
          data: { following: { disconnect: { username } } },
        });
        return { ok: true };
      }
    ),
  },
};

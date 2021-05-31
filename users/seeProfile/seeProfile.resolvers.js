import client from "../../client";
import { existUser } from "../users.utils";

export default {
  Query: {
    seeProfile: (_, { username }) =>
      client.user.findUnique({ where: { username } }),
  },
  User: {
    following: async ({ username }, { page }) => {
      let following = [];
      if (existUser(username)) {
        following = await client.user
          .findUnique({ where: { username } })
          .following({ take: 5, skip: (page - 1) * 5 });
      }
      return following;
    },
    followers: async ({ username }, { page }) => {
      let followers = [];
      if (existUser(username)) {
        followers = await client.user
          .findUnique({ where: { username } })
          .followers({ take: 5, skip: (page - 1) * 5 });
      }
      return followers;
    },
  },
};

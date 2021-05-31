import client from "../../client";

export default {
  Query: {
    searchUsers: async (_, { term }) =>
      await client.user.findMany({
        where: { username: { startsWith: term.toLowerCase() } },
      }),
  },
};

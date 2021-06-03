export default {
  Mutation: {
    deleteAccount: async (_, { username }, { client }) => {
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

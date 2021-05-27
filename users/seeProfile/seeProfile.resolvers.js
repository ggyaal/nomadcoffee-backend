export default {
  Query: {
    seeProfile: (_, { username }, { client }) =>
      client.user.findUnique({ where: { username } }),
  },
};

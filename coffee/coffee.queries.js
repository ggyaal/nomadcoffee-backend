import client from "../client";

export default {
  Query: {
    coffees: () => client.coffee.findMany(),
    coffee: (_, { name }) => client.coffee.findUnique({ where: { name } }),
  },
};

export default {
  Query: {
    seeCoffeeShop: (_, { id }, { client }) =>
      client.coffeeShop.findUnique({ where: { id } }),
  },
};

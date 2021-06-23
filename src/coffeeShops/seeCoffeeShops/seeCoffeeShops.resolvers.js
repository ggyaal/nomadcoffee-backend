export default {
  Query: {
    seeCoffeeShops: (_, { page }, { client }) => ({
      coffeeShops: client.coffeeShop.findMany({
        take: 2,
        skip: (page - 1) * 2,
      }),
    }),
  },
  CoffeeShopResult: {
    totalShops: (_, __, { client }) => client.coffeeShop.count(),
  },
};

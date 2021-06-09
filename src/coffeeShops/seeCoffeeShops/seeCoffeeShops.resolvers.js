export default {
  Query: {
    seeCoffeeShops: (_, { page }, { client }) => ({
      coffeeShops: client.coffeeShop.findMany({
        take: 5,
        skip: (page - 1) * 5,
      }),
    }),
  },
  CoffeeShopResult: {
    totalShops: (_, __, { client }) => client.coffeeShop.count(),
  },
};

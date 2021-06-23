export default {
  Query: {
    seeCoffeeShops: (_, { offset }, { client }) => ({
      coffeeShops: client.coffeeShop.findMany({
        take: 2,
        ...(offset && { skip: offset }),
      }),
    }),
  },
};

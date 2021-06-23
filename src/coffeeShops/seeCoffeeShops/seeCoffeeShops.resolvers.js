export default {
  Query: {
    seeCoffeeShops: (_, { offset }, { client }) =>
      client.coffeeShop.findMany({
        take: 2,
        ...(offset && { skip: offset }),
      }),
  },
};

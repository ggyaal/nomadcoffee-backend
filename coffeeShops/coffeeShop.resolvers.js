import client from "../client";

export default {
  CoffeeShop: {
    user: ({ userId }) => client.user.findUnique({ where: { id: userId } }),
    photos: ({ id }, { page }) =>
      client.coffeeShop
        .findUnique({ where: { id } })
        .photos({ take: 5, skip: (page - 1) * 5 }),
    categories: ({ id }) =>
      client.category.findMany({ where: { shops: { some: { id } } } }),
  },
  Category: {
    totalShops: ({ id }) =>
      client.coffeeShop.count({ where: { categories: { some: { id } } } }),
  },
};

import client from "../../client";

export default {
  Query: {
    searchShops: (_, { term, category }) => {
      if (!term && !category) return [];
      return client.coffeeShop.findMany({
        where: {
          OR: [
            ...(term && { name: { contains: term.toLowerCase() } }),
            ...(category && { category: { contains: category.toLowerCase() } }),
          ],
        },
      });
    },
  },
};

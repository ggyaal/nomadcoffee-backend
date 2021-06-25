import client from "../../client";

export default {
  Query: {
    searchShops: (_, { term }) => {
      if (term.startsWith("#")) {
        return client.coffeeShop.findMany({
          where: {
            categories: {
              some: {
                name: term.slice(1),
              },
            },
          },
        });
      }

      return client.coffeeShop.findMany({
        where: {
          name: {
            contains: term.toLowerCase(),
            mode: "insensitive",
          },
        },
      });
    },
  },
};

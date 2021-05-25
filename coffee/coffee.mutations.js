import client from "../client";

export default {
  Mutation: {
    createCoffee: (_, { name, kind, taste, stock }) =>
      client.coffee.create({
        data: {
          name,
          kind,
          taste,
          stock,
        },
      }),
    updateCoffee: (_, { id, kind, taste, stock }) =>
      client.coffee.update({
        where: { id },
        data: { kind, taste, stock },
      }),
    deleteCoffee: (_, { id }) => client.coffee.delete({ where: { id } }),
  },
};

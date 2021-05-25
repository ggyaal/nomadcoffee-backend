import { gql } from "apollo-server-core";

export default gql`
  type Coffee {
    id: Int!
    name: String!
    kind: String!
    taste: String
    stock: Int!
    comeIn: String!
    updateAt: String!
  }
  type Query {
    coffees: [Coffee]
    coffee(id: Int!): Coffee
  }
  type Mutation {
    createCoffee(
      name: String!
      kind: String!
      taste: String
      stock: Int!
    ): Coffee
    updateCoffee(id: Int!, kind: String, taste: String, stock: Int): Coffee
    deleteCoffee(id: Int!): Coffee
  }
`;

import { gql } from "apollo-server";

export default gql`
  type CoffeeShopResult {
    coffeeShops: [CoffeeShop]
    totalShops: Int!
  }

  type Query {
    seeCoffeeShops(page: Int!): CoffeeShopResult!
  }
`;

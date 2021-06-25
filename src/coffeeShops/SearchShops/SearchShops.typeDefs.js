import { gql } from "apollo-server";

export default gql`
  type Query {
    searchShops(term: String!): [CoffeeShop]
  }
`;

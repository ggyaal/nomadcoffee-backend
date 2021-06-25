import { gql } from "apollo-server";

export default gql`
  type Query {
    SearchShops(term: String!, category: String!): [coffeeShop]
  }
`;

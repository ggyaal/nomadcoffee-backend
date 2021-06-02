import { gql } from "apollo-server";

export default gql`
  type Mutation {
    createCoffeeShop(
      name: String!
      categories: String
      photos: String
      latitude: String
      longitude: String
    ): Result!
  }
`;

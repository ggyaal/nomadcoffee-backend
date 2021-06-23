import { gql } from "apollo-server";

export default gql`
  type Mutation {
    createCoffeeShop(
      name: String!
      categories: String
      photos: [Upload]
      latitude: String
      longitude: String
    ): Result!
  }
`;

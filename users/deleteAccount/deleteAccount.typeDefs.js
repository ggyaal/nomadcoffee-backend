import { gql } from "apollo-server";

export default gql`
  type Mutation {
    deleteAccount(username: String!): Result!
  }
`;

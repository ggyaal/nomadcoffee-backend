import { gql } from "apollo-server";

export default gql`
  type Mutation {
    unFollowing(username: String!): UserResult!
  }
`;

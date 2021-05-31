import { gql } from "apollo-server";

export default gql`
  type Mutation {
    following(username: String!): UserResult!
  }
`;

import { gql } from "apollo-server";

export default gql`
  type Query {
    searchUsers(term: String!): [User]
  }
`;

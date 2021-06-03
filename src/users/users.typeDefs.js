import { gql } from "apollo-server";

export default gql`
  type Result {
    ok: Boolean!
    token: String
    error: String
  }

  type UserResult {
    ok: Boolean!
    error: String
    Users: [User]
  }

  type User {
    id: Int!
    username: String!
    email: String!
    name: String!
    location: String
    avatarURL: String
    githubUsername: String
    createdAt: String!
    updatedAt: String!
    followers(page: Int!): [User]
    following(page: Int!): [User]
  }
`;

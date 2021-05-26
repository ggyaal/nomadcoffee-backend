import { gql } from "apollo-server";

export default gql`
  type AccountResult {
    ok: Boolean!
    error: String
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
  }

  type Query {
    users: [User]
    user(username: String!): User
  }

  type Mutation {
    createAccount(
      username: String!
      email: String!
      name: String!
      location: String
      avatarURL: String
      githubUsername: String
      password: String!
    ): AccountResult!
    deleteAccount(username: String!): AccountResult!
  }
`;

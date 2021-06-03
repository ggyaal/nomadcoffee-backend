import { gql } from "apollo-server";

export default gql`
  type Mutation {
    editProfile(
      username: String
      email: String
      name: String
      location: String
      avatarURL: String
      githubUsername: String
      password: String
    ): Result!
  }
`;

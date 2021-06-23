import { gql } from "apollo-server";

export default gql`
  type Mutation {
    editProfile(
      email: String
      name: String
      location: String
      avatar: Upload
      githubUsername: String
      password: String
    ): Result!
  }
`;

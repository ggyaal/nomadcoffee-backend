require("dotenv").config();
import { ApolloServer } from "apollo-server";
import client from "./client";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
      client,
    };
  },
});

const PORT = process.env.PORT;

server
  .listen(PORT)
  .then(console.log(`server is running on http://localhost:${PORT} 🚀`));

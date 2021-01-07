import { ApolloServer } from "apollo-server-micro";
import { typeDefs } from "./schemas";
import { resolvers } from "./resolvers";

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: process.env.NODE_ENV !== "production",
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });

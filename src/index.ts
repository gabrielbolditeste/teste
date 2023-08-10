import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { connect } from "mongoose";
import { typeDefs, resolvers } from "./GraphQL/index.js";

const MONGODB = process.env.DATA_BASE_MONGODB;

await connect(MONGODB);

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const port = Number.parseInt(process.env.PORT) || 4000;

const { url } = await startStandaloneServer(server, {
  listen: { port: port },
});

console.clear();
console.log(`🚀 Server listening at: ${url}`);

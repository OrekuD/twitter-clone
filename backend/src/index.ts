import { ApolloServer } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";
import { buildSchema } from "type-graphql";
import { PostResolver } from "./Resolvers/PostsResolver";
import { UserResolver } from "./Resolvers/UserResolver";

const PORT = process.env.PORT || 4000;

const main = async () => {
  await mongoose.connect("mongodb://localhost:27017/weconnect", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const app = express();

  const schema = await buildSchema({
    resolvers: [PostResolver, UserResolver],
    validate: false,
  });

  const server = new ApolloServer({ schema });
  server.applyMiddleware({ app });
  app.listen(PORT, () => console.log("Server is running"));
};

main();

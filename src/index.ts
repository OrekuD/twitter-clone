import { ApolloServer } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";
import { buildSchema } from "type-graphql";
// import { PostsModel } from "./entities/Posts";
import { PostsResolver } from "./Resolvers/PostsResolver";

const PORT = process.env.PORT || 4000;

const main = async () => {
  await mongoose.connect("mongodb://localhost:27017/weconnect", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const app = express();

  const schema = await buildSchema({
    resolvers: [PostsResolver],
    validate: false,
  });

  const server = new ApolloServer({ schema });
  server.applyMiddleware({ app });
  // const p = await PostsModel.find();
  // app.get("/posts", (_, res) => {
  //   res.send(p);
  // });
  app.listen(PORT, () => console.log("Server is running"));
};

main();

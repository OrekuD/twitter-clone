import { ApolloServer } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";
import { buildSchema } from "type-graphql";
import { TweetsResolver } from "./Resolvers/TweetsResolver";
import { UserResolver } from "./Resolvers/UserResolver";
import cors from "cors";
import { LikeResolver } from "./Resolvers/LikeResolver";
import session from "express-session";
import connectMongo from "connect-mongo";
import { SearchResolver } from "./Resolvers/SearchResolver";
import { TrendsResolver } from "./Resolvers/TrendsResolver";
import { setLogLevel, LogLevels } from "@typegoose/typegoose";
import { RetweetResolver } from "./Resolvers/RetweetResolver";

const main = async () => {
  const PORT = process.env.PORT || 4000;
  setLogLevel(LogLevels.TRACE);
  await mongoose.connect("mongodb://localhost:27017/twitter-clone", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const app = express();
  app.use(cors({ origin: "http://localhost:3000", credentials: true }));
  app.use("/profile_images", express.static("public/profile_images"));

  const MongoStore = connectMongo(session);
  app.use(
    session({
      name: "uid",
      secret: "Laborisquisnullaexcepteurdoadminimadipisicing.",
      store: new MongoStore({
        mongooseConnection: mongoose.connection,
        collection: "sessions",
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
      },
      resave: false,
      saveUninitialized: false,
    })
  );

  const schema = await buildSchema({
    resolvers: [
      TweetsResolver,
      UserResolver,
      LikeResolver,
      SearchResolver,
      TrendsResolver,
      RetweetResolver,
    ],
    validate: false,
  });

  const server = new ApolloServer({
    schema,
    context: ({ req }) => ({ request: req }),
  });
  server.applyMiddleware({ app, cors: false });
  app.listen(PORT, () => console.log("Server is up"));
};

main();

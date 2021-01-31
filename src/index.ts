import "reflect-metadata";
import { __prod__, __cookie_name__, __port__ } from "./consts";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import express from "express";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";
import { createConnection } from "typeorm";
import { Post } from "./entities/Post";
import { User } from "./entities/User";
import { Updoot } from "./entities/Updoot";

const main = async () => {
  await createConnection({
    type: "postgres",
    database: "caracall",
    username: "vladyslav",
    password: "new-password",
    logging: true,
    synchronize: true,
    entities: [Post, User, Updoot],
  });

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis();
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(
    session({
      name: __cookie_name__,
      store: new RedisStore({
        client: redis as any,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 YEARS
        httpOnly: true,
        sameSite: "lax", // csrf protection
        secure: __prod__, // cookie only works in https
      },
      saveUninitialized: false,
      secret: "dfjstretreqwrerewt",
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res, redis }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(__port__, () => {
    console.log(`Server started on port ${__port__}`);
  });
};

main().catch((error) => console.error(error));

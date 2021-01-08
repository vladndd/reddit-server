import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./consts";
import {__port__} from "./consts";
import { Post } from "./entities/Post";
import microConfig from "./mikro-orm.config";
import express from "express";
const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();
  const app = express();
  app.listen(__port__, () => {
    console.log(`Server started on port ${__port__}`)
  })
};

main().catch((error) => console.error(error));

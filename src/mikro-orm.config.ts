import { __prod__ } from "./consts";
import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";
import path from "path";

export default {
  entities: [Post],
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  dbName: "caracall",
  type: "postgresql",
  user: 'vladyslav',
  password: 'new-password',
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];

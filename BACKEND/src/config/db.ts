import { Pool } from "pg";
import { config } from "./env";

const pool = new Pool({
  user: config.useRemoteDb ? config.dbUserRemote : config.dbUserLocal,
  host: config.useRemoteDb ? config.dbHostRemote : config.dbHostLocal,
  database: config.useRemoteDb ? config.dbNameRemote : config.dbNameLocal,
  password: config.useRemoteDb ? config.dbPasswordRemote : config.dbPasswordLocal,
  port: config.useRemoteDb ? config.dbPortRemote : config.dbPortLocal,
  ssl: config.useRemoteDb ? { rejectUnauthorized: false } : undefined,
});

export default pool;
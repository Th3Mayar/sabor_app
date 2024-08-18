import pkg from 'pg';
const { Pool } = pkg;
import { config } from "./env.js";

const pool = new Pool({
  user: config.useRemoteDb ? config.dbUserRemote : config.dbUserLocal,
  host: config.useRemoteDb ? config.dbHostRemote : config.dbHostLocal,
  database: config.useRemoteDb ? config.dbNameRemote : config.dbNameLocal,
  password: config.useRemoteDb ? config.dbPasswordRemote : config.dbPasswordLocal,
  port: config.useRemoteDb ? Number(config.dbPortRemote) : Number(config.dbPortLocal),
  ssl: config.useRemoteDb ? { rejectUnauthorized: false } : undefined,
});

export default pool;
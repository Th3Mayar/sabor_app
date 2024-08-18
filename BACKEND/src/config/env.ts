import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  DB_NAME_LOCAL: z.string().nonempty("DB_NAME_LOCAL is required").optional(),
  DB_USER_LOCAL: z.string().nonempty("DB_USER_LOCAL is required").optional(),
  DB_PASSWORD_LOCAL: z.string().nonempty("DB_PASSWORD_LOCAL is required").optional(),
  DB_HOST_LOCAL: z.string().nonempty("DB_HOST_LOCAL is required").optional(),
  DB_PORT_LOCAL: z.string().nonempty("DB_PORT_LOCAL is required").optional(),
  DB_NAME_REMOTE: z.string().nonempty("DB_NAME_REMOTE is required").optional(),
  DB_USER_REMOTE: z.string().nonempty("DB_USER_REMOTE is required").optional(),
  DB_PASSWORD_REMOTE: z.string().nonempty("DB_PASSWORD_REMOTE is required").optional(),
  DB_HOST_REMOTE: z.string().nonempty("DB_HOST_REMOTE is required").optional(),
  DB_PORT_REMOTE: z.string().nonempty("DB_PORT_REMOTE is required").optional(),
  PORT: z.string().nonempty("PORT is required").optional(),
  USE_REMOTE_DB: z.string().nonempty("USE_REMOTE_DB is required").optional(),
});

const env = envSchema.parse(process.env);

const {
  DB_NAME_LOCAL,
  DB_USER_LOCAL,
  DB_PASSWORD_LOCAL,
  DB_HOST_LOCAL,
  DB_PORT_LOCAL,
  DB_NAME_REMOTE,
  DB_USER_REMOTE,
  DB_PASSWORD_REMOTE,
  DB_HOST_REMOTE,
  DB_PORT_REMOTE,
  PORT,
  USE_REMOTE_DB,
} = env;

export const config = {
  dbNameLocal: DB_NAME_LOCAL,
  dbUserLocal: DB_USER_LOCAL,
  dbPasswordLocal: DB_PASSWORD_LOCAL,
  dbHostLocal: DB_HOST_LOCAL,
  dbPortLocal: DB_PORT_LOCAL ? Number(DB_PORT_LOCAL) : 5432,
  dbNameRemote: DB_NAME_REMOTE,
  dbUserRemote: DB_USER_REMOTE,
  dbPasswordRemote: DB_PASSWORD_REMOTE,
  dbHostRemote: DB_HOST_REMOTE,
  dbPortRemote: DB_PORT_REMOTE ? Number(DB_PORT_REMOTE) : 5432,
  port: PORT ? Number(PORT) : 3000,
  useRemoteDb: USE_REMOTE_DB === "true",
};

// console.log(config);

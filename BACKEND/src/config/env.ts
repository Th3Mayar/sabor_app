import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  // Local DB configuration
  DB_NAME_LOCAL: z.string().nonempty("DB_NAME_LOCAL is required").optional(),
  DB_USER_LOCAL: z.string().nonempty("DB_USER_LOCAL is required").optional(),
  DB_PASSWORD_LOCAL: z
    .string()
    .nonempty("DB_PASSWORD_LOCAL is required")
    .optional(),
  DB_HOST_LOCAL: z.string().nonempty("DB_HOST_LOCAL is required").optional(),
  DB_PORT_LOCAL: z.string().nonempty("DB_PORT_LOCAL is required").optional(),

  // Remote DB configuration
  DB_NAME_REMOTE: z.string().nonempty("DB_NAME_REMOTE is required").optional(),
  DB_USER_REMOTE: z.string().nonempty("DB_USER_REMOTE is required").optional(),
  DB_PASSWORD_REMOTE: z
    .string()
    .nonempty("DB_PASSWORD_REMOTE is required")
    .optional(),
  DB_HOST_REMOTE: z.string().nonempty("DB_HOST_REMOTE is required").optional(),
  DB_PORT_REMOTE: z.string().nonempty("DB_PORT_REMOTE is required").optional(),

  // Other settings
  PORT: z.string().nonempty("PORT is required").optional(),
  USE_REMOTE_DB: z.string().nonempty("USE_REMOTE_DB is required").optional(),
});

const env = envSchema.parse(process.env);

export const config = {
  // Local DB configuration
  dbNameLocal: env.DB_NAME_LOCAL,
  dbUserLocal: env.DB_USER_LOCAL,
  dbPasswordLocal: env.DB_PASSWORD_LOCAL,
  dbHostLocal: env.DB_HOST_LOCAL,
  dbPortLocal: env.DB_PORT_LOCAL,

  // Remote DB configuration
  dbNameRemote: env.DB_NAME_REMOTE,
  dbUserRemote: env.DB_USER_REMOTE,
  dbPasswordRemote: env.DB_PASSWORD_REMOTE,
  dbHostRemote: env.DB_HOST_REMOTE,
  dbPortRemote: env.DB_PORT_REMOTE,

  // Other settings
  port: env.PORT ? Number(env.PORT) : 3000,
  useRemoteDb: env.USE_REMOTE_DB === "true",
};


// console.log(config);
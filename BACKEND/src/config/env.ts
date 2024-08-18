import dotenv from "dotenv";

dotenv.config();

export const config = {
  // Local DB configuration
  dbNameLocal:
    process.env.DB_NAME_LOCAL !== undefined ? process.env.DB_NAME_LOCAL : "",
  dbUserLocal:
    process.env.DB_USER_LOCAL !== undefined ? process.env.DB_USER_LOCAL : "",
  dbPasswordLocal:
    process.env.DB_PASSWORD_LOCAL !== undefined
      ? process.env.DB_PASSWORD_LOCAL
      : "",
  dbHostLocal:
    process.env.DB_HOST_LOCAL !== undefined ? process.env.DB_HOST_LOCAL : "",
  dbPortLocal:
    process.env.DB_PORT_LOCAL !== undefined
      ? Number(process.env.DB_PORT_LOCAL)
      : 5432,

  // Remote DB configuration
  dbNameRemote:
    process.env.DB_NAME_REMOTE !== undefined ? process.env.DB_NAME_REMOTE : "",
  dbUserRemote:
    process.env.DB_USER_REMOTE !== undefined ? process.env.DB_USER_REMOTE : "",
  dbPasswordRemote:
    process.env.DB_PASSWORD_REMOTE !== undefined
      ? process.env.DB_PASSWORD_REMOTE
      : "",
  dbHostRemote:
    process.env.DB_HOST_REMOTE !== undefined ? process.env.DB_HOST_REMOTE : "",
  dbPortRemote:
    process.env.DB_PORT_REMOTE !== undefined
      ? Number(process.env.DB_PORT_REMOTE)
      : 5432,

  // Other settings
  port: process.env.PORT !== undefined ? Number(process.env.PORT) : 3000,
  useRemoteDb: process.env.USE_REMOTE_DB === "true",
};

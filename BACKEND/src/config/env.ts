import dotenv from "dotenv";

dotenv.config();

function getEnvVariable(name: string, defaultValue: string = ""): string {
  const value = process.env[name];
  return value !== undefined ? value : defaultValue;
}

function getEnvVariableAsNumber(name: string, defaultValue: number = 0): number {
  const value = process.env[name];
  return value !== undefined ? Number(value) : defaultValue;
}

export const config = {
  // Local DB configuration
  dbNameLocal: getEnvVariable("DB_NAME_LOCAL"),
  dbUserLocal: getEnvVariable("DB_USER_LOCAL"),
  dbPasswordLocal: getEnvVariable("DB_PASSWORD_LOCAL"),
  dbHostLocal: getEnvVariable("DB_HOST_LOCAL"),
  dbPortLocal: getEnvVariableAsNumber("DB_PORT_LOCAL", 5432),

  // Remote DB configuration
  dbNameRemote: getEnvVariable("DB_NAME_REMOTE"),
  dbUserRemote: getEnvVariable("DB_USER_REMOTE"),
  dbPasswordRemote: getEnvVariable("DB_PASSWORD_REMOTE"),
  dbHostRemote: getEnvVariable("DB_HOST_REMOTE"),
  dbPortRemote: getEnvVariableAsNumber("DB_PORT_REMOTE", 5432),

  // Other settings
  port: getEnvVariableAsNumber("PORT", 4001),
  useRemoteDb: process.env.USE_REMOTE_DB === "true",
};
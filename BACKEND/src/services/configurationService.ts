import {
  Configuration,
  getAllConfigurations,
  getConfigurationById,
  createConfiguration,
  updateConfiguration,
  deleteConfiguration,
} from "../repositories/configurationRepository";

export async function findAllConfigurations(): Promise<Configuration[]> {
  return getAllConfigurations();
}

export async function findConfigurationById(
  config_id: number
): Promise<Configuration | null> {
  return getConfigurationById(config_id);
}

export async function addConfiguration(
  config: Omit<Configuration, "config_id">
): Promise<Configuration> {
  return createConfiguration(config);
}

export async function modifyConfiguration(
  config_id: number,
  config: Partial<Omit<Configuration, "config_id">>
): Promise<Configuration | null> {
  return updateConfiguration(config_id, config);
}

export async function removeConfiguration(config_id: number): Promise<boolean> {
  return deleteConfiguration(config_id);
}

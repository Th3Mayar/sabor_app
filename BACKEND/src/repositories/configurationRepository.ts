import pool from "../config/db";

export interface Configuration {
  config_id: number;
  key: string;
  value: object;
}

export async function getAllConfigurations(): Promise<Configuration[]> {
  const result = await pool.query<Configuration>("SELECT * FROM configuration");
  return result.rows;
}

export async function getConfigurationById(
  config_id: number
): Promise<Configuration | null> {
  const result = await pool.query<Configuration>(
    "SELECT * FROM configuration WHERE config_id = $1",
    [config_id]
  );
  return result.rows[0] || null;
}

export async function createConfiguration(
  config: Omit<Configuration, "config_id">
): Promise<Configuration> {
  const result = await pool.query<Configuration>(
    "INSERT INTO configuration (key, value) VALUES ($1, $2) RETURNING *",
    [config.key, config.value]
  );
  return result.rows[0];
}

export async function updateConfiguration(
  config_id: number,
  config: Partial<Omit<Configuration, "config_id">>
): Promise<Configuration | null> {
  const fields: string[] = [];
  const values: any[] = [];
  let index = 1;

  if (config.key) {
    fields.push(`key = $${index++}`);
    values.push(config.key);
  }
  if (config.value !== undefined) {
    fields.push(`value = $${index++}`);
    values.push(config.value);
  }

  if (fields.length === 0) return null;

  values.push(config_id);

  const result = await pool.query<Configuration>(
    `UPDATE configuration SET ${fields.join(
      ", "
    )} WHERE config_id = $${index} RETURNING *`,
    values
  );

  return result.rows[0] || null;
}

export async function deleteConfiguration(config_id: number): Promise<boolean> {
  const result = await pool.query(
    "DELETE FROM configuration WHERE config_id = $1",
    [config_id]
  );
  return result.rowCount !== null && result.rowCount > 0;
}

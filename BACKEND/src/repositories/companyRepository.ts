import pool from "../config/db";

export interface Company {
  company_id: number;
  name: string;
  address: string;
  tax_id: string;
  phone: string | null;
  email: string | null;
  website: string | null;
  created_at: Date;
  updated_at: Date;
}

export async function getAllCompanies(): Promise<Company[]> {
  const result = await pool.query<Company>("SELECT * FROM company");
  return result.rows;
}

export async function getCompanyById(
  company_id: number
): Promise<Company | null> {
  const result = await pool.query<Company>(
    "SELECT * FROM company WHERE company_id = $1",
    [company_id]
  );
  return result.rows[0] || null;
}

export async function createCompany(
  company: Omit<Company, "company_id" | "created_at" | "updated_at">
): Promise<Company> {
  const result = await pool.query<Company>(
    "INSERT INTO company (name, address, tax_id, phone, email, website) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [
      company.name,
      company.address,
      company.tax_id,
      company.phone,
      company.email,
      company.website,
    ]
  );
  return result.rows[0];
}

export async function updateCompany(
  company_id: number,
  company: Partial<Omit<Company, "company_id" | "created_at" | "updated_at">>
): Promise<Company | null> {
  const fields: string[] = [];
  const values: any[] = [];
  let index = 1;

  if (company.name) {
    fields.push(`name = $${index++}`);
    values.push(company.name);
  }
  if (company.address) {
    fields.push(`address = $${index++}`);
    values.push(company.address);
  }
  if (company.tax_id) {
    fields.push(`tax_id = $${index++}`);
    values.push(company.tax_id);
  }
  if (company.phone) {
    fields.push(`phone = $${index++}`);
    values.push(company.phone);
  }
  if (company.email) {
    fields.push(`email = $${index++}`);
    values.push(company.email);
  }
  if (company.website) {
    fields.push(`website = $${index++}`);
    values.push(company.website);
  }

  if (fields.length === 0) return null;

  values.push(company_id);

  const result = await pool.query<Company>(
    `UPDATE company SET ${fields.join(
      ", "
    )} WHERE company_id = $${index} RETURNING *`,
    values
  );

  return result.rows[0] || null;
}

export async function deleteCompany(company_id: number): Promise<boolean> {
  const result = await pool.query("DELETE FROM company WHERE company_id = $1", [
    company_id,
  ]);
  return result.rowCount !== null && result.rowCount > 0;
}

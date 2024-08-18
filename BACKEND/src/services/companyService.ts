import {
  Company,
  getAllCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
} from "../repositories/companyRepository.js";

export async function findAllCompanies(): Promise<Company[]> {
  return getAllCompanies();
}

export async function findCompanyById(
  company_id: number
): Promise<Company | null> {
  return getCompanyById(company_id);
}

export async function addCompany(
  company: Omit<Company, "company_id" | "created_at" | "updated_at">
): Promise<Company> {
  return createCompany(company);
}

export async function modifyCompany(
  company_id: number,
  company: Partial<Omit<Company, "company_id" | "created_at" | "updated_at">>
): Promise<Company | null> {
  return updateCompany(company_id, company);
}

export async function removeCompany(company_id: number): Promise<boolean> {
  return deleteCompany(company_id);
}

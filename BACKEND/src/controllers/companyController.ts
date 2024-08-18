import { Request, Response } from "express";
import {
  findAllCompanies,
  findCompanyById,
  addCompany,
  modifyCompany,
  removeCompany,
} from "../services/companyService.js";

export async function getAllCompanies(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const companies = await findAllCompanies();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve companies", error });
  }
}

export async function getCompanyById(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const company = await findCompanyById(Number(req.params.id));
    if (company) {
      res.status(200).json(company);
    } else {
      res.status(404).json({ message: "Company not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve company", error });
  }
}

export async function createCompany(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const company = await addCompany(req.body);
    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ message: "Failed to create company", error });
  }
}

export async function updateCompany(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const company = await modifyCompany(Number(req.params.id), req.body);
    if (company) {
      res.status(200).json(company);
    } else {
      res.status(404).json({ message: "Company not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update company", error });
  }
}

export async function deleteCompany(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const success = await removeCompany(Number(req.params.id));
    if (success) {
      res.status(200).json({ message: "Company deleted" });
    } else {
      res.status(404).json({ message: "Company not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete company", error });
  }
}

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

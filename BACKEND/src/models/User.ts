export interface User {
  user_id?: number;
  full_name: string;
  contact_phone: string | null;
  email: string;
  password: string;
  role_id: number | null;
  resetPasswordExpires: number | null;
  resetPasswordToken?: string | null;
  token?: string | null;
}
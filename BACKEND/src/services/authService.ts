import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const generateToken = (user: User) => {
  return jwt.sign({ id: user.user_id, role: user.role_id }, JWT_SECRET, {
    expiresIn: "1h",
  });
};

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    console.error("Error comparing passwords:", error);
    return false;
  }
};

import pool from "../config/db.js";
import {
  User,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers,
} from "../repositories/userRepository.js";

import nodemailer from "nodemailer";

export async function registerUser(user: Omit<User, "user_id">): Promise<User> {
  return createUser(user);
}

export async function findAllUsers(): Promise<User[]> {
  return getAllUsers();
}

export async function findUserById(user_id: number): Promise<User | null> {
  return getUserById(user_id);
}

export async function modifyUser(
  user_id: number,
  user: Partial<Omit<User, "user_id">>
): Promise<User | null> {
  return updateUser(user_id, user);
}

export async function removeUser(user_id: number): Promise<boolean> {
  return deleteUser(user_id);
}

export async function findUserByResetToken(
  token: string
): Promise<User | null> {
  const result = await pool.query<User>(
    "SELECT * FROM users WHERE reset_password_token = $1",
    [token]
  );
  return result.rows[0] || null;
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const result = await pool.query<User>(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );
  return result.rows[0] || null;
}

export async function sendResetEmail(
  email: string,
  resetUrl: string
): Promise<void> {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: "saborapp8@gmail.com",
    to: email,
    subject: "Password Reset Request",
    html: `<p>You requested a password reset. Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
  };

  await transporter.sendMail(mailOptions);
}

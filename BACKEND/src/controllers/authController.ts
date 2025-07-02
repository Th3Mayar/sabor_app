import { Request, Response } from "express";
import * as authService from "../services/index.js";
import * as userRepository from "../repositories/index.js";

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await userRepository.findUserByEmail(email);

    if (!user) {
      if (!email.includes("@") || !email.includes(".com")) {
        res.status(401).json({ message: "El email no es válido" });
        return;
      } else {
        res.status(401).json({ message: "Usuario no encontrado con este email" });
      return;
      }
    }

    if (user.password === password) {
      console.log("User authenticated");
      const token = authService.generateToken(user);
      console.log;
      res.status(200).json({ token });
    } else {
      res
        .status(401)
        .json({ message: "La contraseña proporcionada no es válida." });
    }
  } catch (error) {
    res.status(500).json({ message: "Se produjo un error inesperado al intentar iniciar sesión", error });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { full_name, contact_phone, email, password, role_id } = req.body;
    const hashedPassword = await authService.hashPassword(password);

    console.log("Hashed password:", hashedPassword);

    const newUser = await userRepository.createUser({
      full_name,
      contact_phone,
      email,
      password: hashedPassword,
      role_id,
      resetPasswordExpires: 0
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Failed to register user", error });
  }
};

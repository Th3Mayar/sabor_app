import { Router } from "express";
import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController";
import { authenticateJWT } from "../middlewares/authMiddleware";

const router = Router();

router.get("/users", authenticateJWT, getAllUsers);
router.get("/users/:id", authenticateJWT, getUser);
router.post("/users", createUser);
router.put("/users/:id", authenticateJWT, updateUser);
router.delete("/users/:id", authenticateJWT, deleteUser);

export default router;

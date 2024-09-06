import { Router } from "express";
import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  saveColumnOrder,
  getColumnOrder,
  requestPasswordReset,
  resetPassword,
} from "../controllers/userController.js";
import { authenticateJWT } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/users", authenticateJWT, getAllUsers);
router.get("/users/:id", authenticateJWT, getUser);
router.post("/users", createUser);
router.put("/users/:id", authenticateJWT, updateUser);
router.delete("/users/:id", authenticateJWT, deleteUser);
router.get('/column-order', authenticateJWT, getColumnOrder);
router.post('/column-order', authenticateJWT, saveColumnOrder);
router.post("/auth/request-reset-password", requestPasswordReset);
router.post("/auth/reset-password", resetPassword);

export default router;

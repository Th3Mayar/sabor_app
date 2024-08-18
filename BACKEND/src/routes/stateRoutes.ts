import { Router } from "express";
import {
  getAllStates,
  getStateById,
  createState,
  updateState,
  deleteState,
} from "../controllers/stateController.js";

const router = Router();

router.get("/states", getAllStates);
router.get("/states/:id", getStateById);
router.post("/states", createState);
router.put("/states/:id", updateState);
router.delete("/states/:id", deleteState);

export default router;
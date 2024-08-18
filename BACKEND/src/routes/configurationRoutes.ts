import { Router } from "express";
import {
  getAllConfigurations,
  getConfigurationById,
  createConfiguration,
  updateConfiguration,
  deleteConfiguration,
} from "../controllers/configurationController.js";

const router = Router();

router.get("/configurations", getAllConfigurations);
router.get("/configurations/:id", getConfigurationById);
router.post("/configurations", createConfiguration);
router.put("/configurations/:id", updateConfiguration);
router.delete("/configurations/:id", deleteConfiguration);

export default router;
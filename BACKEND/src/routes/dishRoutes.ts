import { Router } from "express";
import {
  getAllDishes,
  getDishById,
  createDish,
  updateDish,
  deleteDish,
} from "../controllers/dishController.js";

const router = Router();

router.get("/dishes", getAllDishes);
router.get("/dishes/:id", getDishById);
router.post("/dishes", createDish);
router.put("/dishes/:id", updateDish);
router.delete("/dishes/:id", deleteDish);

export default router;
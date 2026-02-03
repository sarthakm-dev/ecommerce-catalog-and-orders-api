import { Router } from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
  deleteCategory,
  updateCategory,
} from "./category.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, createCategory);
router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.delete("/:id", authMiddleware, deleteCategory);
router.patch("/:id", authMiddleware, updateCategory);
export default router;

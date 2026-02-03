import { Router } from "express";
import { createUser, getMe, deleteMe } from "./user.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/", createUser);       // Register Instead later
router.get("/me", authMiddleware, getMe);
router.delete("/me", authMiddleware, deleteMe);

export default router;
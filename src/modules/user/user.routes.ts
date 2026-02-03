import { Router } from "express";
import { createUser, getMe, deleteMe, updateName } from "./user.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/", createUser);
router.get("/me", authMiddleware, getMe);
router.delete("/me", authMiddleware, deleteMe);
router.patch("/me",authMiddleware,updateName);
export default router;
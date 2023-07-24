import { Router } from "express";
import authMiddleware from "@/middleware/auth-middleware";
import { getTodosController } from "@/controllers/todo";

const router = Router();

router.get("/get-todos", getTodosController);
router.post("create-todo", );

export default router;

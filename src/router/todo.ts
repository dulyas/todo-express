import { Router } from "express";
import authMiddleware from "@/middleware/auth-middleware";
import {
	createTodoController,
	getTodosController,
	updateTodoTitleController,
	updateTodoDoneController,
	deleteTodoController,
} from "@/controllers/todo";

const router = Router();

router.get("/get-todos", getTodosController);
router.post("/create-todo", createTodoController);
router.put("/update-todo-text", authMiddleware, updateTodoTitleController);
router.put("/update-todo-done", authMiddleware, updateTodoDoneController);
router.delete("/delete-todo/:id", authMiddleware, deleteTodoController);

export default router;

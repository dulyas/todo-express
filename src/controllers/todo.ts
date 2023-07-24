import ApiError from "@/exceptions/api-error";
import { createTodo, getTodos } from "@/services/todo";
import { NextFunction, Request, Response } from "express";

export const getTodosController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { page = 0 } = req.query;

		const todos = getTodos(+page);

		res.json({
			todos,
		});
	} catch (e) {
		next(e);
	}
};

export const createTodoController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { title, username, email } = req.body;

		if (!email) return next(ApiError.BadRequest("Email can't be empty"));
		if (!title) return next(ApiError.BadRequest("Title can't be empty"));
		if (!username)
			return next(ApiError.BadRequest("Username can't be empty"));
		if (!String(email).match(/.+@.+\..+/i))
			return next(ApiError.BadRequest("Not Valid Email"));

		const todo = createTodo(username, email, title);

		res.json({
			todo,
		});
	} catch (e) {
		next(e);
	}
};

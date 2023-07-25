import ApiError from "@/exceptions/api-error";
import {
	createTodo,
	deleteTodo,
	getTodos,
	updateTodoDone,
	updateTodoTitle,
} from "@/services/todo";
import { NextFunction, Request, Response } from "express";
import checkEqualQuery from "@/helpers/checkEqualQuery";

export const deleteTodoController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = req.params;

		if (!id) next(ApiError.BadRequest(`Insert todo id for delete`));

		const deleted = await deleteTodo(+id);

		res.json({
			deleted,
		});
	} catch (e) {
		next(e);
	}
};

export const updateTodoTitleController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id, title } = req.body;

		const todo = await updateTodoTitle(id, title);

		res.json({
			todo,
		});
	} catch (e) {
		next(e);
	}
};

export const updateTodoDoneController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id, done } = req.body;

		const todo = await updateTodoDone(id, done);

		res.json({
			todo,
		});
	} catch (e) {
		next(e);
	}
};

export const getTodosController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { status, username, email, page = 0 } = req.query;

		const pageInfo = await getTodos(
			checkEqualQuery(status as string),
			checkEqualQuery(username as string),
			checkEqualQuery(email as string),
			+page,
		);

		res.json({
			pageInfo,
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

		const todo = await createTodo(username, email, title);

		res.json({
			todo,
		});
	} catch (e) {
		next(e);
	}
};

import { Todo } from "@/models";
import { IQueryObjectItem, IOrderByCfg } from "@/types";
import orderByGenerator from "@/helpers/orderByGenerator";
import { Page } from "objection";

export const getTodos = async (
	status: string,
	username: string,
	email: string,
	page: number,
): Promise<Page<Todo>> => {
	const orderByCfg: IOrderByCfg[] = orderByGenerator({
		username: username as IQueryObjectItem,
		done: status as IQueryObjectItem,
		email: email as IQueryObjectItem,
	});

	const pageInfo = await Todo.query().orderBy(orderByCfg).page(page, 3);

	return pageInfo;
};

export const getTodosByUserId = async (
	user_id: number,
	limit: number = 5,
	offset: number = 0,
): Promise<Todo[]> => {
	const todos = await Todo.query()
		.where({ user_id })
		.orderBy("id", "desc")
		.limit(limit)
		.offset(offset);

	return todos;
};

export const createTodo = async (
	username: string,
	email: string,
	title: string,
): Promise<Todo> => {
	const newTodo = await Todo.query().insertAndFetch({
		title,
		email,
		username,
	});

	return newTodo;
};

export const deleteTodo = async (id: number): Promise<number> => {
	const deleted = await Todo.query().findById(id).delete();

	return deleted;
};

export const updateTodoTitle = async (
	id: number,
	title: string,
): Promise<Todo> => {
	const updatedTodo = await Todo.query().updateAndFetchById(id, {
		title,
		edited: 1,
	});

	return updatedTodo;
};

export const updateTodoDone = async (
	id: number,
	done: number | boolean,
): Promise<Todo> => {
	const updatedTodo = await Todo.query().updateAndFetchById(id, {
		done: done ? 1 : 0,
	});

	return updatedTodo;
};

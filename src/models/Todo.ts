import { Model } from "objection";

export default class Todo extends Model {
	id!: number;
	username!: string;
	email!: string;
	title!: string;
	edited!: 1 | 0;
	done!: 1 | 0;

	static get tableName() {
		return "todos";
	}
}

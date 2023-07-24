import { Todo } from "@/models";
import User from "@/models/User";

export default class UserDto {
	id: number;
	name: string;

	constructor(model: User) {
		this.id = model.id;
		this.name = model.name;
	}
}

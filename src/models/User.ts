import { Model } from "objection";
import UserDto from "@/dtos/user-dto";

export type UserWithTokens = {
	refreshToken: string;
	accessToken: string;
	user: UserDto;
};

export default class User extends Model {
	id!: number;
	password!: string;
	name!: string;

	static get tableName() {
		return "users";
	}
}

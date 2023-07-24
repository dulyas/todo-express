import { User } from "@/models";
import bcrypt from "bcrypt";
import UserDto from "@/dtos/user-dto";
import {
	generateTokens,
	saveToken,
	removeToken,
	validateRefreshToken,
	findToken,
} from "./token";
import ApiError from "@/exceptions/api-error";
import { UserWithTokens } from "@/models/User";

export const generateAndSaveTokens = async (
	user: User,
): Promise<UserWithTokens> => {
	const userDto = new UserDto(user);
	const tokens = generateTokens({ ...userDto });

	await saveToken(userDto.id, tokens.refreshToken);

	return {
		...tokens,
		user: userDto,
	};
};

export const registration = async (
	name: string,
	password: string,
): Promise<UserWithTokens> => {
	const candidate = await User.query().findOne({ name });

	if (candidate) {
		throw ApiError.BadRequest("Name already exist");
	}
	const hashPassword = await bcrypt.hash(password, 3);

	const user = await User.query().insertAndFetch({
		name,
		password: hashPassword,
	});

	const {
		accessToken,
		refreshToken,
		user: userDto,
	} = await generateAndSaveTokens(user);

	return {
		accessToken,
		refreshToken,
		user: userDto,
	};
};

export const login = async (
	name: string,
	password: string,
): Promise<UserWithTokens> => {
	const user = await User.query()
		.findOne({ name })
		.onError((e) => console.log(e.message));
	if (!user) {
		throw ApiError.BadRequest("User not found");
	}

	const isPassEquals = await bcrypt.compare(password, user.password);
	if (!isPassEquals) {
		throw ApiError.BadRequest("Wrong password");
	}

	const {
		accessToken,
		refreshToken,
		user: userDto,
	} = await generateAndSaveTokens(user);

	return {
		accessToken,
		refreshToken,
		user: userDto,
	};
};

export const logout = (refreshToken: string): Promise<number> => {
	const token = removeToken(refreshToken);
	return token;
};

export const refresh = async (
	refreshToken: string,
): Promise<UserWithTokens> => {
	if (!refreshToken) throw ApiError.UnauthorizedError();
	const userData: UserDto | null = validateRefreshToken(refreshToken);
	const tokenFromDb = findToken(refreshToken);

	if (!userData || !tokenFromDb) {
		throw ApiError.UnauthorizedError();
	}

	const user = await User.query().findById(userData.id);

	if (!user) throw ApiError.BadRequest("No User for this token");

	const {
		accessToken,
		refreshToken: _refreshToken,
		user: userDto,
	} = await generateAndSaveTokens(user);

	return {
		accessToken,
		refreshToken: _refreshToken,
		user: userDto,
	};
};

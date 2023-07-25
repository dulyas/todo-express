import { NextFunction, Request, Response } from "express";
import { User } from "@/models";
import * as userService from "@/services/user";

export const registration = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { name, password } = req.body;

		const userData = await userService.registration(name, password);

		res.cookie("refreshToken", userData.refreshToken, {
			maxAge: 30 * 24 * 60 * 60 * 1000,
			httpOnly: true,
		});
		return res.json(userData);
	} catch (e) {
		next(e);
	}
};

export const login = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { name, password, keepLogin } = req.body;

		const userData = await userService.login(name, password);

		if (keepLogin) {
			res.cookie("refreshToken", userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
		}

		res.json(userData);
	} catch (e) {
		next(e);
	}
};

export const logout = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { refreshToken } = req.cookies;

		const token = await userService.logout(refreshToken);

		res.clearCookie("refreshToken");
		res.json(token);
	} catch (e) {
		next(e);
	}
};

export const refresh = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { refreshToken } = req.cookies;

		const userData = await userService.refresh(refreshToken);

		res.cookie("refreshToken", userData.refreshToken, {
			maxAge: 30 * 24 * 60 * 60 * 1000,
			httpOnly: true,
		});
		res.json(userData);
	} catch (e) {
		next(e);
	}
};

export const getUsers = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const users = await User.query();

		res.json(users);
	} catch (e) {
		next(e);
	}
};

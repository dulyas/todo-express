import ApiError from "@/exceptions/api-error";
import { validateAccessToken } from "@/services/token";
import { NextFunction, Request, Response } from "express";

export default function (req: Request, res: Response, next: NextFunction) {
	try {
		const authrizationHeader = req.headers.authorization;

		if (!authrizationHeader) {
			return next(ApiError.UnauthorizedError());
		}

		const accessToken = authrizationHeader.split(" ")[1];

		if (!accessToken) {
			return next(ApiError.UnauthorizedError());
		}

		const userData = validateAccessToken(accessToken);

		if (!userData) {
			return next(ApiError.UnauthorizedError());
		}

		req.user = userData;
		next();
	} catch (e) {
		return next(ApiError.UnauthorizedError());
	}
}

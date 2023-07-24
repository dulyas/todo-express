import ApiError from "@/exceptions/api-error";
import { NextFunction, Request, Response } from "express";

export default function (
	err: unknown,
	req: Request,
	res: Response,
	next: NextFunction,
) {
	if (err instanceof ApiError) {
		return res.status(err.status).send({ message: err.message });
	}
	return res.status(500).send({ message: "Unexpected Error" });
}

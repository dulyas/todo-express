import config from "@/config";
import express from "express";
import router from "@/router";
import cors from "cors";
import { createServer } from "http";
import UserDto from "@/dtos/user-dto";
import cookieParser from "cookie-parser";
import errorMiddleware from "@/middleware/error-middleware";

const app = express();

app.use(
	cors({
		credentials: true,
		origin: config.client_url!,
	}),
);
app.use(express.text({ type: "text/*" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/", router);
app.use(errorMiddleware);

const server = createServer(app);

declare global {
	namespace Express {
		interface Request {
			user?: UserDto;
		}
	}
}

export const startApp = () => {
	return server.listen(config.port, async (err?: Error) => {
		if (err) {
			console.error(`Error : ${err}`);
			process.exit(-1);
		}

		console.log(`${config.app} is running on ${config.port}`);
		console.log(`Database: ${config.database}`);
	});
};

export default app;

import path from "path";

export default {
	development: {
		client: "sqlite3",
		connection: {
			filename: path.resolve(__dirname, "./db/todos.db3"),
		},
		migrations: {
			directory: path.resolve(__dirname, "./migrations"),
			extension: "ts",
		},
		pool: {
			min: 2,
			max: 10,
		},
	},
};

import { config } from "dotenv";
config();

export default {
	port: process.env.PORT,
	app: process.env.APP,
	env: process.env.NODE_ENV,
	secret: process.env.APP_SECRET,
	hostname: process.env.HOSTNAME,
	database: process.env.DATABASE,
	client_url: process.env.CLIENTURL,
	jwt: {
		access_secret: process.env.JWT_ACCESS_SECRET,
		refresh_sercet: process.env.JWT_REFRESH_SECRET,
	},
};

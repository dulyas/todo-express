import { body } from "express-validator";
import {
	getUsers,
	registration,
	login,
	logout,
	refresh,
} from "@/controllers/user";
import { Router } from "express";

const router = Router();

router.get("/", getUsers);

router.post("/registration", registration);

router.post("/login", login);
router.post("/logout", logout);
router.get("/refresh", refresh);

export default router;

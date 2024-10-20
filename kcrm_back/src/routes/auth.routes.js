import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post('/', (req, res) => AuthController.authUser(req, res));

export default authRouter;
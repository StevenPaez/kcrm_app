import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import authValidation from "../middleware/authValidation.middleware.js";

const authRouter = Router();

authRouter.post('/', authValidation, (req, res) => AuthController.authUser(req, res));

export default authRouter;
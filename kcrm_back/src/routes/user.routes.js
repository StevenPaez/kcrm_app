import { Router } from "express";
import UserController from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get('/', (req, res) => UserController.getUsers(req, res));
userRouter.get('/:id', (req, res) => UserController.getUser(req, res));

export default userRouter;
import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import userValidation from "../middleware/userValidation.middleware.js";

const userRouter = Router();

userRouter.get('/', (req, res) => UserController.getUsers(req, res));
userRouter.get('/:id', (req, res) => UserController.getUser(req, res));
userRouter.post('/', userValidation, (req, res) => UserController.createUser(req, res));
userRouter.put('/:id', (req, res) => UserController.updateUser(req, res));
userRouter.delete('/:id', (req, res) => UserController.deleteUser(req, res));

export default userRouter;
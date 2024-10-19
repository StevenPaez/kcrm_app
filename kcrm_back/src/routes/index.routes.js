import { Router } from "express";
import sequelize from "../../database.js";

const router = Router();

router.get('/', async (req, res) => {
    res.send('Hello World!');
})

export default router
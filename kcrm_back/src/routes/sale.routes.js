import { Router } from "express";

const saleRouter = Router();

saleRouter.get('/', (req, res) => {
    res.send('Sales');
});

export default saleRouter
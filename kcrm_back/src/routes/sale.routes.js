import { Router } from "express";
import SaleController from "../controllers/sale.controller.js";

const saleRouter = Router();

saleRouter.get('/', (req, res) => SaleController.getSales(req, res));
saleRouter.get('/:id', (req, res) => SaleController.getSales(req, res));
saleRouter.post('/', (req, res) => SaleController.createSale(req, res));
saleRouter.put('/:id', (req, res) => SaleController.updateSale(req, res));
saleRouter.delete('/:id', (req, res) => SaleController.deleteSale(req, res));

export default saleRouter;
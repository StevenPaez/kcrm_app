import SaleService from "../services/sale.service.js";

class SaleController {
    constructor() {
        this.saleService = SaleService;
    }

    async getSales(req, res) {
        try {
            const sales = await this.saleService.getSales();
            res.json(sales);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    async getSale(req, res) {
        try {
            const sale = await this.saleService.getSale(req.params.id);
            res.json(sale);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    async createSale(req, res) {
        try {
            const sale = await this.saleService.createSale(req.body);
            res.json(sale);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    async updateSale(req, res) {
        try {
            const sale = await this.saleService.updateSale(req.params.id, req.body);
            res.json(sale);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    async deleteSale(req, res) {
        try {
            const sale = await this.saleService.deleteSale(req.params.id);
            res.json(sale);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
}

export default new SaleController();
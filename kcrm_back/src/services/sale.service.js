import  Sale  from "../models/sale.model.js";
import User from "../models/user.model.js";

class SaleService {

    constructor() {
        this.saleModel = Sale;
    }

    async getSales() {
        const sales = await this.saleModel.findAll({
            attributes: [
                'id',
                'product',
                'requested_amount',
                'franchise',
                'rate',
                'created_user.name',
                'created_at',
                'updated_user.name',
                'updated_at'
            ],
            include: [
            {
                model: User,
                as: 'created_user'
            },
            {
                model: User,
                as: 'updated_user'
            }]
        });
        return sales;
    }

    async getSale(id) {
        const sale = await this.saleModel.findByPk(id);
        return sale;
    }

    async createSale(sale) {
        const newSale = await this.saleModel.create(sale);
        return newSale;
    }

    async updateSale(id, sale) {
        const updatedSale = await this.saleModel.update(sale, { where: { id } });
        return updatedSale;
    }

    async deleteSale(id) {
        const deletedSale = await this.saleModel.destroy({ where: { id } });
        return deletedSale;
    }
}

export default new SaleService();
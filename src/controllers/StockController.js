import StockService from "../services/StockService.js";

export default class StockController {
    constructor() {
        this.stockService = new StockService();
    }

    async create(req, res) {
        try {
            const stock = await this.stockService.create(req.body);
            res.status(201).json(stock);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getAll(req, res) {
        try {
            const stocks = await this.stockService.getAll();
            res.status(200).json(stocks);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
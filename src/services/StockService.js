import StockRepository from "../repositories/StockRepository.js";
import Stock from "../models/Stock.js";

export default class StockService {
    constructor() {
        this.stockRepository = new StockRepository();
    }

    async create(stockData) {
        try {
            const stock = new Stock(stockData);
            stock.validate();
            return await this.stockRepository.create({...stock});
        } catch (error) {
            throw new Error(`Error al crear el stock: ${error.message}`);
        }
    }

    async getAll() {
        try {
            return await this.stockRepository.getAll();
        } catch (error) {
            throw new Error(`Error al obtener los stocks: ${error.message}`);
        }
    }
}
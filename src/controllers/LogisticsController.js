import LogisticsService from "../services/LogisticsService.js";

export default class LogisticsController {
    constructor() {
        this.logisticsService = new LogisticsService();
    }

    async create(req, res) {
        try {
            const logisticData = req.body;
            const result = await this.logisticsService.create(logisticData);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAll(req, res) {
        try {
            const logistics = await this.logisticsService.getAll();
            res.status(200).json(logistics);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
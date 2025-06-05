import LogisticsService from "../services/LogisticsService.js";

export default class LogisticsController {
    constructor() {
        this.logisticsService = new LogisticsService();
    }

    async create(req, res, next) {
        try {
            const logisticData = req.body;
            const result = await this.logisticsService.create(logisticData);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    async getAll(req, res, next) {
        try {
            const logistics = await this.logisticsService.getAll();
            res.status(200).json(logistics);
        } catch (error) {
            next(error);
        }
    }

    async getById(req, res, next) {
        try {
            const { id } = req.params;
            const logistic = await this.logisticsService.getById(id);
            res.status(200).json(logistic);
        } catch (error) {
            next(error);
        }
    }

    async getInfo(req, res) {
        try {
            const info = await this.logisticsService.getInfo();
            res.status(200).json(info);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
import CircularService from "../services/CircularService.js";

export default class CircularController {
    constructor() {
        this.CircularService = new CircularService();
    }

    async create(req, res, next) {
        try {
            const circularData = req.body;
            const circular = await this.CircularService.create(circularData);
            res.status(201).json(circular);
        } catch (error) {
            next(error);
        }
    }

    async getAll(req, res, next) {
        try {
            const circulars = await this.CircularService.getAll();
            res.status(200).json(circulars);
        } catch (error) {
            next(error);
        }
    }

    async getById(req, res, next) {
        try {
            const { id } = req.params;
            const circular = await this.CircularService.getById(id);
            res.status(200).json(circular);
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const circularData = req.body;
            const updatedCircular = await this.CircularService.update(id, circularData);
            res.status(200).json(updatedCircular);
        } catch (error) {
            next(error);
        }
    }
}
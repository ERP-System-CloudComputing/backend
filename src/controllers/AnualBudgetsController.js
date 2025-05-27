import AnualBudgetsService from "../services/AnualBudgetService.js"

export default class AnualBudgetsController {
    constructor(anualBudgetsService) {
        this.anualBudgetsService = new AnualBudgetsService();
    }
    
    async create(req, res, next) {
        try {
            const anualBudgetData = req.body;
            const anualBudget = await this.anualBudgetsService.create(anualBudgetData);
            res.status(201).json(anualBudget);
        } catch (error) {
            next(error);
        }
    }

    async getById(req, res, next) {
        try {
            const { id } = req.params;
            const anualBudget = await this.anualBudgetsService.getById(id);
            res.json(anualBudget);
        } catch (error) {
            next(error);
        }
    }
}
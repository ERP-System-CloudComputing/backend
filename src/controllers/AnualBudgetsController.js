
export default class AnualBudgetsController {
    constructor(anualBudgetsService) {
        this.anualBudgetsService = anualBudgetsService;
    }
    
    async create(req, res, next) {
        try {
        const anualBudget = await this.anualBudgetsService.create(req.body);
        res.status(201).json(anualBudget);
        } catch (error) {
        next(error);
        }
    }
    
    async getAll(req, res, next) {
        try {
        const anualBudgets = await this.anualBudgetsService.getAll();
        res.json(anualBudgets);
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
    
    async update(req, res, next) {
        try {
        const { id } = req.params;
        const anualBudgetData = req.body;
        const anualBudget = await this.anualBudgetsService.update(id, anualBudgetData);
        res.json(anualBudget);
        } catch (error) {
        next(error);
        }
    }
    
    async delete(req, res, next) {
        try {
        const { id } = req.params;
        await this.anualBudgetsService.delete(id);
        res.status(204).end();
        } catch (error) {
        next(error);
        }
    }
}
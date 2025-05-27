import BudgetService from "../services/BudgetService.js"

export default class BudgetController {
    constructor(budgetService) {
        this.budgetService = new BudgetService();
    }
    
    async create(req, res, next) {
        try {
            const budgetData = req.body;
            const budget = await this.budgetService.create(budgetData);
            res.status(201).json(budget);
        } catch (error) {
            next(error);
        }
    }
    
    async getAll(req, res, next) {
        try {
            const budgets = await this.budgetService.getAll();
            res.json(budgets);
        } catch (error) {
            next(error);
        }
    }
    
    async getById(req, res, next) {
        try {
            const { id } = req.params;
            const budget = await this.budgetService.getById(id);
            res.json(budget);
        } catch (error) {
            next(error);
        }
    }
    
    async update(req, res, next) {
        try {
            const { id } = req.params
            const budgetData = req.body
            const budget = await this.budgetService.update(id, budgetData)
            res.json(budget)
        } catch (error) {
            next(error)
        }
    }
    
    async delete(req, res, next) {
        try {
            const { id } = req.params;
            await this.budgetService.delete(id);
            res.status(204).end();
        } catch (error) {
            next(error);
        }
    }
}
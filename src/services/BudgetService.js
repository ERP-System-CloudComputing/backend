import BudgetRepository from "../repositories/BudgetRepository.js";
import Budget from "../models/Budget.js";

export default class BudgetService {
    constructor(budgetRepository) {
        this.budgetRepository = new BudgetRepository();
    }

    async create(budget) {
        const newBudget = new Budget(budget);
        console.log(newBudget);
    }
}
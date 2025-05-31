import BudgetRepository from "../repositories/BudgetRepository.js";
import AnualBudgetRepository from "../repositories/AnualBudgetRepository.js";
import Budget from "../models/Budget.js";

export default class BudgetService {
    constructor(budgetRepository) {
        this.budgetRepository = new BudgetRepository();
        this.anualBudgetRepository = new AnualBudgetRepository();
    }

    async create(budget) {
        
        console.log(budget.requestDate);

        return

        const anualBudgetId = await this.anualBudgetRepository.getByYear(budget.year);

        if (!annualBudgetId) {
            throw {
                message: 'El ID del presupuesto anual es obligatorio',
                statusCode: 400
            }
        }

        const existingBudget = await this.anualBudgetRepository.getById(annualBudgetId);
        
        if (!existingBudget) {
            throw {
                message: 'Presupuesto anual no encontrado',
                statusCode: 404
            }
        }

        const newBudget = new Budget(budget);
        return this.budgetRepository.create({ ...newBudget });
    }

    async getAll() {
        return await this.budgetRepository.getAll();
    }
}
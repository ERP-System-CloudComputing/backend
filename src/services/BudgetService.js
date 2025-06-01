import BudgetRepository from "../repositories/BudgetRepository.js";
import AnualBudgetRepository from "../repositories/AnualBudgetRepository.js";
import Budget from "../models/Budget.js";

export default class BudgetService {
    constructor(budgetRepository) {
        this.budgetRepository = new BudgetRepository();
        this.anualBudgetRepository = new AnualBudgetRepository();
    }

    async create(budget) {

        const { annualBudgetId } = budget;

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

    async getById(id) {
        if (!id) {
            throw {
                message: 'El ID del presupuesto es obligatorio',
                statusCode: 400
            };
        }

        const budget = await this.budgetRepository.getById(id);
        if (!budget) {
            throw {
                message: `Presupuesto con ID ${id} no encontrado`,
                statusCode: 404
            };
        }
        return budget;
    }

    async getAll() {
        return await this.budgetRepository.getAll();
    }

    async getAllPending() {
        return await this.budgetRepository.getAllPending();
    }

    async getAllApproved() {
        return await this.budgetRepository.getAllApproved();
    }

    async submitForApproval(budgetIds) {
        if (!Array.isArray(budgetIds) || budgetIds.length === 0) {
            throw {
                message: 'Formato de IDs inválidos',
                statusCode: 400
            };
        }

        const budgets = await Promise.all(
            budgetIds.map(async (id) => {
                const budget = await this.budgetRepository.getById(id);
                if (!budget) {
                    throw {
                        message: `Presupuesto con ID ${id} no encontrado`,
                        statusCode: 404
                    };
                }
                return budget;
            })
        );

        if (budgets.length === 0) {
            throw {
                message: 'Presupuestos no encontrados',
                statusCode: 404
            };
        }

        const updatedBudgets = budgets.map(budget => ({
            ...budget,
            status: 'APPROVED',
        }));

        try {
            await Promise.all(updatedBudgets.map(budget => this.budgetRepository.update(budget.id, budget)));
        } catch (error) {
            throw {
                message: 'Fallo alguna actualización de presupuesto',
                statusCode: 500,
                error: error.message
            };
        }
    }
}
import AnualBudgetRepository from "../repositories/AnualBudgetRepository.js"
import AnualBudget from "../models/AnualBudgets.js";

export default class AnualBudgetService {
    constructor(anualBudgetModel) {
        this.anualBudgetRepository = new AnualBudgetRepository()
    }

    async create(anualBudget) {
        const newAnualBudget = new AnualBudget(anualBudget)
        return await this.anualBudgetRepository.create({ ...newAnualBudget })
    }

    async getById(id) {
        return await this.anualBudgetRepository.getById(id);
    }

    async getByYear(year) {
        return await this.anualBudgetRepository.getByYear(year);
    }
}
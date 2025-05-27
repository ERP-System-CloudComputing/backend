import { db } from "../config/firebase.js"
import IAnualBudgetRepository from "../interfaces/IAnualBudgetRepository.js"

export default class AnualBudgetRepository extends IAnualBudgetRepository {
    constructor() {
        super()
        this.collection = db.collection('anualBudgets')
    }
    
    async create(anualBudget) {
        const newAnualBudget = await this.collection.add(anualBudget)
        return { id: newAnualBudget.id, ...anualBudget }
    }
}
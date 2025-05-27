import IStaffRepository from "../interfaces/IStaffRepository.js";
import { db } from "../config/firebase.js";

export default class BudgetRepository extends IStaffRepository {
    constructor() {
        super();
        this.collection = db.collection('budgets')
    }

    async create(budget) {
        const result = await this.collection.add(budget);
        return { id: result.id, ...budget };
    }
}
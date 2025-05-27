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

    async getAll() {
        const snapshot = await this.collection.get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
}
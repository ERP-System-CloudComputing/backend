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

    async getById(id) {
        const doc = await this.collection.doc(id).get();
        return doc.exists ? { id: doc.id, ...doc.data() } : null;
    }

    async update(id, budget) {
        await this.collection.doc(id).update(budget);
        return { id, ...budget };
    }

    async getAll() {
        const snapshot = await this.collection.get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    async getAllPending() {
        const snapshot = await this.collection.where('status', '==', 'PENDING').get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    async getAllApproved() {
        const snapshot = await this.collection.where('status', '==', 'APPROVED').get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
}
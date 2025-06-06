import { db } from "../config/firebase.js";

export default class BeneficiaryRepository {
    constructor() {
        this.collection = db.collection('beneficiaries');
    }

    async create(beneficiary) {
        const doc = await this.collection.add(beneficiary);
        return { id: doc.id, ...beneficiary };
    }

    async getById(id) {
        const doc = await this.collection.doc(id).get();
        if (!doc.exists) {
            throw new Error('Beneficiary not found');
        }
        return { id: doc.id, ...doc.data() };
    }
}
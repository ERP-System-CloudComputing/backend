import { db } from "../config/firebase.js";

export default class StockRepository {
    constructor() {
        this.collection = db.collection('stocks');
    }

    async create(stock) {
        try {
            const doc = await this.collection.add(stock);
            return { id: doc.id, ...stock };
        } catch (error) {
            throw new Error(`Ocurrió un error al crear el stock: ${error.message}`);
        }
    }

    async getAll() {
        try {
            const snapshot = await this.collection.get();
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            throw new Error(`Ocurrió un error al obtener los stocks: ${error.message}`);
        }
    }
}
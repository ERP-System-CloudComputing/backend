import { db } from "../config/firebase.js";

export default class LogisticsRepository {
    constructor() {
        this.collection = db.collection('logistics');
    }

    async create(logistic) {
        try {
            const docRef = await this.collection.add(logistic);
            return { id: docRef.id, ...logistic };
        } catch (error) {
            throw new Error(`Error al crear el Logistics: ${error.message}`);
        }
    }

    async getAll() {
        try {
            const snapshot = await this.collection.get();
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            throw new Error(`Error al recuperar todos los Logistics: ${error.message}`);
        }
    }

    async getById(id) {
        try {
            const doc = await this.collection.doc(id).get();
            if (!doc.exists) {
                throw new Error(`Logistics con ID ${id} no encontrado`);
            }
            return { id: doc.id, ...doc.data() };
        } catch (error) {
            throw new Error(`Error al recuperar el Logistics con ID ${id}: ${error.message}`);
        }
    }
}
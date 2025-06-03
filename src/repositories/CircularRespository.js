import { db } from "../config/firebase.js";
import ICircularRepository from "../interfaces/ICircularRepository.js";

export default class CircularRepository extends ICircularRepository {
    constructor() {
        super();
        this.collection = db.collection('circulars')
    }

    async create(circular) {
        const result = await this.collection.add(circular);
        return { id: result.id, ...circular };
    }

    async getAll() {
        const snapshot = await this.collection.get();
        const circulars = [];
        snapshot.forEach(doc => {
            circulars.push({ id: doc.id, ...doc.data() });
        });
        return circulars;
    }

    async getById(id) {
        const doc = await this.collection.doc(id).get();
        if (!doc.exists) {
            throw new Error(`El circular con ID ${id} no existe.`); // Error handling for non-existent document
        }
        return { id: doc.id, ...doc.data() };
    }
}
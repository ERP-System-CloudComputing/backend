import { db } from "../config/firebase.js";
import ICircularRepository from "../interfaces/ICircularRepository.js";

export default class CircularRepository extends ICircularRepository {
    constructor() {
        super();
        this.collection = db.collection('budgets')
    }

    async create(circular) {
        const result = await this.collection.add(circular);
        return { id: result.id, ...circular };
    }
}
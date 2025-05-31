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

    async getById(id) {
        const anualBudget = await this.collection.doc(id).get()
        return !anualBudget.exists ? null : { id: anualBudget.id, ...anualBudget.data() }
    }

    async getByYear(year) {
        // Retornar unicamente un objeto del año solicitado o el mas reciente
        const querySnapshot = await this.collection.where('year', '==', year).get()
        if (querySnapshot.empty) {
            const latestSnapshot = await this.collection.orderBy('year', 'desc').limit(1).get()
            return latestSnapshot.empty ? null : { id: latestSnapshot.docs[0].id, ...latestSnapshot.docs[0].data() }
        }
        // Si hay varios, retornar el primero
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))[0] || null;
    }
}
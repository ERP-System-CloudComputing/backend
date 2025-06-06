import { db } from '../config/firebase.js';
import IMemoRepository from '../interfaces/IMemoRepository.js';

export default class MemoRepository extends IMemoRepository {
    constructor() { 
        super();
        this.collection = db.collection('memos');
    }

    async create(memo) {
        try {
            const doc = await this.collection.add(memo);
            return { id: doc.id, ...memo };
        } catch (error) {
            throw new Error(`Error creating memo: ${error.message}`);
        }
    }

    async getAll() {
        try {
            const snapshot = await this.collection.get();
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            throw new Error(`Error retrieving all memos: ${error.message}`);
        }
    }

    async getById(id) {
        try {
            const doc = await this.collection.doc(id).get();
            if (!doc.exists) {
                throw new Error(`Memo with id ${id} not found`);
            }
            return { id: doc.id, ...doc.data() };
        } catch (error) {
            throw new Error(`Error retrieving memo with id ${id}: ${error.message}`);
        }
    }

    async update(id, memo) {
        try {
            await this.collection.doc(id).update(memo);
            return { id, ...memo };
        } catch (error) {
            throw new Error(`Error updating memo with id ${memo.id}: ${error.message}`);
        }
    }
}
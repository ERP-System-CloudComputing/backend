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
}
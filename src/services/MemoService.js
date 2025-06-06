import MemoRepository from "../repositories/MemoRepository.js";
import Memo from "../models/Memo.js";

export default class MemoService {
    constructor() {
        this.memoRepository = new MemoRepository();
    }

    async createMemo(memoData) {
        try {
            const memo = new Memo(memoData);
            memo.validate();
            return await this.memoRepository.create(memo);
        } catch (error) {
            throw new Error(`Error al crear el memo: ${error.message}`);
        }
    }

    async getAllMemos() {
        try {
            return await this.memoRepository.getAll();
        } catch (error) {
            throw new Error(`Error al obtener todos los memos: ${error.message}`);
        }
    }
}
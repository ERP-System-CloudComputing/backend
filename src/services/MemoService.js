import MemoRepository from "../repositories/MemoRepository.js";
import Memo from "../models/Memo.js";

export default class MemoService {
    constructor() {
        this.memoRepository = new MemoRepository();
    }

    async create(memoData) {
        try {
            const memo = new Memo(memoData);
            memo.validate();
            return await this.memoRepository.create({ ...memo });
        } catch (error) {
            throw new Error(`Error al crear el memo: ${error.message}`);
        }
    }

    async getAll() {
        try {
            return await this.memoRepository.getAll();
        } catch (error) {
            throw new Error(`Error al obtener todos los memos: ${error.message}`);
        }
    }

    async getById(id) {
        try {
            return await this.memoRepository.getById(id);
        } catch (error) {
            throw new Error(`Error al obtener el memo con id ${id}: ${error.message}`);
        }
    }

    async action(id, actionData) {
        try {
            const memo = await this.memoRepository.getById(id);
            if (!memo) {
                throw new Error(`El memo con id ${id} no existe`);
            }
            
            const memoInstance = new Memo(memo);
            Object.assign(memoInstance, actionData);

            return await this.memoRepository.update(id, { ...memoInstance });
        } catch (error) {
            throw new Error(`Error performing action on memo with id ${id}: ${error.message}`);
        }
    }
}
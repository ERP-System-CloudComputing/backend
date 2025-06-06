import MemoService from "../services/MemoService.js";

export default class MemoController {
    constructor() {
        this.memoService = new MemoService();
    }

    async create(req, res, next) {
        try {
            const memoData = req.body;
            const memo = await this.memoService.create(memoData);
            res.status(201).json(memo);
        } catch (error) {
            next(error);
        }
    }

    async getAll(req, res, next) {
        try {
            const memos = await this.memoService.getAll();
            res.status(200).json(memos);
        } catch (error) {
            next(error);
        }
    }

    async getById(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                throw new Error("ID parameter is required");
            }
            const memo = await this.memoService.getById(id);
            res.status(200).json(memo);
        } catch (error) {
            next(error);
        }
    }

    async action(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                throw new Error("El ID del memo es requerido para realizar la acción");
            }
            const actionData = req.body;
            await this.memoService.action(id, actionData);
            res.status(200).json({ message: `Action performed on memo with id ${id}` });
        } catch (error) {
            next(error);
        }
    }
}
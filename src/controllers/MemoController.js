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
}
import BeneficiaryService from "../services/BeneficiaryService.js";

export default class BeneficiaryController {
    constructor() {
        this.beneficiaryService = new BeneficiaryService();
    }

    async create(req, res, next) {
        try {
            const beneficiaryData = req.body;
            const newBeneficiary = await this.beneficiaryService.create(beneficiaryData);
            res.status(201).json(newBeneficiary);
        } catch (error) {
            next(error);
        }
    }

    async getById(req, res, next) {
        try {
            const { id } = req.params;
            const beneficiary = await this.beneficiaryService.getById(id);
            res.status(200).json(beneficiary);
        } catch (error) {
            next(error);
        }
    }
}
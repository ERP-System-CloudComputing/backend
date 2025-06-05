import Beneficiary from "../models/Beneficiary.js";
import BeneficiaryRepository from "../repositories/BeneficiaryRepository.js";

export default class BeneficiaryService {
    constructor() {
        this.repository = new BeneficiaryRepository();
    }

    async create(beneficiaryData) {
        try {

            const newBeneficiary = new Beneficiary(beneficiaryData);

            newBeneficiary.validate();

            return await this.repository.create({...newBeneficiary});
        } catch (error) {
            throw new Error(`Error al crear el beneficiario: ${error.message}`);
        }
    }

    async getById(id) {
        try {
            return await this.repository.getById(id);
        } catch (error) {
            throw new Error(`Error al recuperar al beneficiario: ${error.message}`);
        }
    }
}
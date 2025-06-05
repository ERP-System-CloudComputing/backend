import LogisticsRequest from "../models/LogisticsRequest.js";
import LogisticsRepository from "../repositories/LogisitcsRepository.js";

export default class LogisticsService {
    constructor(logisticsRepository) {
        this.logisticsRepository = new LogisticsRepository();
    }

    async create(logisticData) {
        try {
            
            const logistic = new LogisticsRequest(logisticData);

            // Validar los campos requeridos
            logistic.validate();

            return await this.logisticsRepository.create(logistic);
        } catch (error) {
            throw new Error(`Error al crear el Logistics: ${error.message}`);
        }
    }

    async getAll() {
        try {
            return await this.logisticsRepository.getAll();
        } catch (error) {
            throw new Error(`Error al recuperar todos los Logistics: ${error.message}`);
        }
    }
}
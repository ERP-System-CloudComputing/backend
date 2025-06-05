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

            return await this.logisticsRepository.create({...logistic});
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

    async getById(id) {
        try {
            return await this.logisticsRepository.getById(id);
        } catch (error) {
            throw new Error(`Error al recuperar el Logistics con ID ${id}: ${error.message}`);
        }
    }

    async getInfo() {
        try {
            const logistics = await this.logisticsRepository.getAll();
            const totalLogistics = logistics.length;
            const totalCost = logistics.reduce((sum, logistic) => sum + parseFloat(logistic.amount.replace(/,/g, '')), 0);
            const pendingLogistics = logistics.filter(logistic => logistic.status === 'PENDING').length;
            const approvedLogistics = logistics.filter(logistic => logistic.status === 'APPROVED').length;

            return {
                totalLogistics,
                totalCost,
                pendingLogistics,
                approvedLogistics
            };
        } catch (error) {
            throw new Error(`Error al recuperar la información del Logistics: ${error.message}`);
        }
    }

    async changeAction(id, actionData) {
        try {
            const logistic = await this.logisticsRepository.getById(id);
            if (!logistic) {
                throw new Error('No se encontró el Logistics con el ID proporcionado.');
            }
            
            const actionUpdatedLogistic = new LogisticsRequest({
                ...logistic,
                status: actionData.action || logistic.status,
                remarks: actionData.remarks || logistic.remarks
            })

            return await this.logisticsRepository.update(id, {...actionUpdatedLogistic});
        } catch (error) {
            throw new Error(`Error al cambiar la acción del Logistics con ID ${id}: ${error.message}`);
        }
    }
}
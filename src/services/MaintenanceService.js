import MaintenanceRepository from "../repositories/MaintenanceRepository.js";
import Maintenance from "../modules/Maintenance.js";

export default class MaintenanceService {
  constructor () {
    this.maintenanceRepository = new MaintenanceRepository()
  }
  async create(maintenanceData) {
    return this.maintenanceRepository.create({...maintenanceData})
    }
    async getAll() {
      return await this.maintenanceRepository.getAll()
    }
    async getByDate (date) {
    return await this.maintenanceRepository.getByDate(date)
  }
}

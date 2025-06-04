import MaintenanceService from '../services/MaintenanceService.js'
export default class MaintenanceController{
  constructor () {
    this.maintenanceService = new MaintenanceService()
  }
  async create(req,res,next) {
    try{
      const maintenance = await this.maintenanceService.create(req.body)
      res.status(201).json(maintenance)
    }catch(error) {
      next(error)
    }
  }
  async getAll(req,res,next) {
    try {
      const maintenances = await this.maintenanceService.getAll()
      res.json(maintenances)
    } catch(error) {
      next(error)
    }
  }
  async getByDate(req,res,next) {
    try {
      const { date } = req.params 
      const maintenances = await this.maintenanceService.getByDate(date)
      res.json(maintenances)
    } catch (error){
      next(error)
    }
  }
}
import CapacityService from "../services/CapacityService.js"

export default class CapacityController {
  constructor () {
    this.capacityService = new CapacityService()
  }

  async create(req,res,next) {
    try {
      const {capacity, dataList} = req.body
      const Newcapacity = await this.capacityService.create(capacity,dataList)
      res.status(201).json(Newcapacity)
    } catch (error) {
      next(error)
    }
  }
  async getAll(req,res,next) {
    try {
      const capacity = await this.capacityService.getAll()
      res.json(capacity)
    } catch(error) {
      next(error)
    }
  }
  async getById(req,res,next) {
    try {
      const { id } = req.params 
      const capacity = await this.capacityService.getById(id)
      res.json(capacity)
    } catch (error){
      next(error)
    }
  }
  async getByCapacityID(req,res,next) {
    try {
      const { id } = req.params 
      const capacity = await this.capacityService.getByCapacityID(id)
      res.json(capacity)
    } catch (error){
      next(error)
    }
  }
  async update(req,res,next){
    try{
      const { id } = req.params
      const capacityData = req.body
      const capacity = await this.capacityService.update(id, capacityData)
      res.json(capacity)
    }catch(error){
      next(error)
    }
  }
}
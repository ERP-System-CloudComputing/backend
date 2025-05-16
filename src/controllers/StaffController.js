import StaffService from '../services/StaffService.js'
export default class StaffController{
  constructor () {
    this.staffService = new StaffService()
  }

  async login(req, res, next) {
    try {
      const { personalEmail, password } = req.body
      const token = await this.staffService.login(personalEmail, password);
      res.json({ token });
      
    } catch (error) {
      next(error);
    }
  }

  async create(req,res,next) {
    try{
      const staff = await this.staffService.create(req.body)
      res.status(201).json(staff)
    }catch(error) {
      next(error)
    }
  }
  async getAll(req,res,next) {
    try {
      const staffs = await this.staffService.getAll()
      res.json(staffs)
    } catch(error) {
      next(error)
    }
  }
  async getByRol(req,res,next) {
    try {
      const { role } = req.params 
      const staffs = await this.staffService.getByRol(role)
      res.json(staffs)
    } catch (error){
      next(error)
    }
  }
  async update(req,res,next){
    try{
      const { id } = req.params
      const staffData = req.body
      const staff = await this.staffService.update(id, staffData)
      res.json(staff)
    }catch(error){
      next(error)
    }
  }
  async delete(req,res,next){
    try{
      const { id } = req.params 
      await this.staffService.delete(id)
      res.status(204).end() // .end termina la peticion 
    }catch(error){
      next(error)
    }
  }

}
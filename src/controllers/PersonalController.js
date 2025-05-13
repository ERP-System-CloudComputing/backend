import PersonalService from '../services/PersonalService.js'
export default class PersonalController{
  constructor () {
    this.personalService = new PersonalService()
  }

  async create(req,res,next) {
    try{
      const personal = await this.personalService.create(req.body)
      res.status(201).json(personal)
    }catch(error) {
      next(error)
    }
  }
}
import PersonalService from '../services/PacienteService.js'
export default class PersonalController{
  constructor () {
    this.personalService = new PersonalService()
  }

  async create(req,res,next) {
    //const personal = await this.personalService.create()
  }
}
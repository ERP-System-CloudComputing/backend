import PersonalRepository from "../repositories/PersonalRepository.js";
import Personal from "../modules/Personal.js";

export default class PersonalService {
  constructor () {
    this.personalRepository = new PersonalRepository()
  }

  async create(personalData) {
    
    const { email } = personalData
    
    const uniquePersonal = await this.personalRepository.findByEmail(email)
    
    if (uniquePersonal) {
      throw { message: 'El Personal ya existe', statusCode:400}
    }
    
    const newPersonal = new Personal ({...personalData})
    
    return this.personalRepository.create({...newPersonal})
  }

}
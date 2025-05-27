import StaffRepository from "../repositories/StaffRepository.js";
import Staff from "../modules/Staff.js";
import bcrypt from 'bcrypt'
export default class StaffService {
  constructor () {
    this.staffRepository = new StaffRepository()
  }

  async create(staffData) {
    
    const { firstName, lastName, personalEmail, password } = staffData
    const uniqueStaff = await this.staffRepository.getByEmail(personalEmail)
    if (uniqueStaff) {
      throw { 
        message: 'There is already a staff with the same personal email', 
        statusCode:400
      }
    }
    const uniqueFullName = await this.staffRepository.getByFullName(firstName,lastName)
      if(uniqueFullName){
         throw {
            message: 'There is already a staff with the full name',
            statusCode: 400
         }
      }
    const hashedPassword = await bcrypt.hash(password,10) 
    const newStaff = new Staff({...staffData, password: hashedPassword}) // -Toma todo el objeto y solo cambia el password hash 
    return this.staffRepository.create({...newStaff})
  }

  async getAll() {
    return await this.staffRepository.getAll()
  }

  async getByRol (rol) {
    return await this.staffRepository.getByRol(rol)
  }
  async getById (id) {
    return await this.staffRepository.getById(id)
  }

  async getByName (name) {
    return await this.staffRepository.getByName(name)
  }

  async update (id,staffData){
    const { password } = staffData 
    const updateStaff = await this.staffRepository.getById(id)
    if ( !updateStaff ) {
      throw { 
        message: 'Staff not found', 
        statusCode:404
      }
    }
    if (password) {
      staffData.password = await bcrypt.hash(password,10)
    }
    const newStaff = new Staff({...updateStaff,...staffData})
    return this.staffRepository.update(id,{...newStaff})
  }

  async delete (id) {
    const staffExists = await this.staffRepository.getById(id)
    if( !staffExists) {
      throw {
        message: 'Staff not found',
        statusCode: 404
      }
    }
    await this.staffRepository.delete(id)
  }

}
import SalaryDefinitionRepository from "../repositories/salaryDefinitionRepository.js";
import SalaryDefinition from "../models/SalaryDefinition.js";

export default class SalaryDefinitionService {
  constructor() {
    this.salaryDefinitionRepository = new SalaryDefinitionRepository()
  }

  async create(salaryData) {
    if ( !salaryData.title || !salaryData.level || !salaryData.basicSalary || !salaryData.allowance || !salaryData.grossSalary || !salaryData.deduction) {
      throw new Error("Missing required salary definition fields");
    }
    const newSalaryDefinition = new SalaryDefinition({
      title: salaryData.title,
      level: salaryData.level,
      basicSalary: salaryData.basicSalary,
      allowance: salaryData.allowance,
      grossSalary: salaryData.grossSalary,
      deduction: salaryData.deduction
    });

    return this.salaryDefinitionRepository.create(newSalaryDefinition);
  }

  async getAll() {
    return this.salaryDefinitionRepository.getAll()
  }

  async delete(id) {
    const deleteUser = await this.salaryDefinitionRepository.getById(id)
    if (!deleteUser) throw { message: 'Paciente no encontrado', statusCode: 404}

    return this.salaryDefinitionRepository.delete(id)
  }

  async update (id,userData){
    const updateUser = await this.salaryDefinitionRepository;
    if ( !updateUser ) {
      throw { 
        message: 'User not found', 
        statusCode:404
      }
    }
    const newUser = new SalaryDefinition({ ...this.updateUser, ...userData })
    return this.salaryDefinitionRepository.update( id, { ...newUsers} )
  }

}
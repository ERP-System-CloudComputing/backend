import SalaryDefinitionService from "../services/salaryDefinitionService.js";

export default class SalaryDefinitionController {
  constructor() {
    this.salaryDefinitionService = new SalaryDefinitionService;
  }

  async create(req, res, next) {
    try {
      const salaryDefinitionUser = await this.salaryDefinitionService.create(req.body);
      res.status(201).json(salaryDefinitionUser);
    } catch (e) {
      next(e);
    }
  }

  async getAll(req, res, next) {
    try {
      const salaryDefinitionusers = await this.salaryDefinitionService.getAll();
      res.json(salaryDefinitionusers);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await this.salaryDefinitionService.delete(id)
      res.status(204).end() // * Termina la petición

    } catch (error) {
      next(error)
    }
  }

  async update(req,res,next){
    try{
      const { id } = req.params
      const userData = req.body
      const user = await this.salaryDefinitionService.update(id, userData)
      res.json(user);

    }catch(error){
      next(error);
    }
  }
}
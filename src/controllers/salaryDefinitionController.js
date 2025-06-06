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
}
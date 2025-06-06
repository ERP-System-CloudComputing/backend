import ISalaryDefiniton from "../interfaces/ISalaryDefinition.js";
import { db } from "../config/firebase.js";

export default class SalaryDefinitionRepository extends ISalaryDefiniton {
  constructor() {
    super();
    this.collection = db.collection('salaryDefinition')
  }

  async create(salaryDefinition) {
    try {
      const newDoc = await this.collection.add({ ...salaryDefinition });
      return { id: newDoc.id, ...salaryDefinition };
    } catch (e) {
      // console.error("Error creating salary definition:", error);
      throw new Error("Could not create salary definition");
    }
  }

  async getAll() {
    try {
      const users = await this.collection.get()
      return users.docs.map((user) => ({
        id: user.id, ...user.data()
      }));
    } catch (e) {
      // console.error("Error fetching salary definitions:", error);
      throw new Error("Could not retrieve salary definitions");
    }
  }

}
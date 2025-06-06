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

  async delete(id) {
    await this.collection.doc(id).delete()
    return { id, message: 'User deleted Successfully' }
  }

  async update(id, userData) {
    await this.collection.doc(id).update(userData)
    return { id, ...userData }
  }

  async getById(id) { // <-- ¡Añade este método!
    try {
      const doc = await this.collection.doc(id).get();
      if (!doc.exists) {
        return null; // Retorna null si no se encuentra el documento
      }
      return { id: doc.id, ...doc.data() };
    } catch (e) {
      console.error("Error fetching salary definition by ID:", e);
      throw new Error("Could not retrieve salary definition by ID");
    }
  }


}
import IMaintenanceRepository from "../interfaces/IMaintenanceRepository.js"
import { db } from "../config/firebase.js";

export default class MaintenanceRepository extends IMaintenanceRepository {
  constructor () {
    super()
    this.collection = db.collection('maintenance')
  }
  async create(maintenance) {
    const newMaintenance = await this.collection.add(maintenance)
    return { id: newMaintenance.id, ...maintenance }
  }
  async getAll() {
    const maintenance = await this.collection.get()
    return maintenance.docs.map((doc) => ({ id:doc.id, ...doc.data() }))
  }
  async getByDate(date) {
    const maintenance = await this.collection.where('date', '==',date).get()
    return maintenance.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
    }))
  }
  async getById(id){
      const maintenance = await this.collection.doc(id).get()
      return !maintenance.exists ? null : { id: maintenance.id, ...maintenance.data() }
  }
  async update(id,maintenanceData) {
    await this.collection.doc(id).update(maintenanceData)
    return {
      id,
      ...maintenanceData
    }
  }

}
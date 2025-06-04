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
    return maintenance.empty ? null : { id:maintenance.docs[0].id, ...maintenance.docs[0].data() }
  }

}
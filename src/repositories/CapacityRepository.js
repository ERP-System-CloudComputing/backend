import ICapacitoryRepository from "../interfaces/ICapacityRepository.js"
import { db } from "../config/firebase.js";

export default class CapacityRepository extends ICapacitoryRepository {
  constructor () {
    super()
    this.collection = db.collection('capacity')
  }
  async create(capacityData) {
    const newcapacity = await this.collection.add(capacityData)
    return { id: newcapacity.id, ...capacityData }
  }
  async getAll() {
    const capacity = await this.collection.get()
    return capacity.docs.map((doc) => ({ id:doc.id, ...doc.data() }))
  }
  async getById(id){
      const capacity = await this.collection.doc(id).get()
      return !capacity.exists ? null : { id: capacity.id, ...capacity.data() }
  }
  async update(id,capacityData) {
    await this.collection.doc(id).update(capacityData)
    return {
      id,
      ...capacityData
    }
  }
}
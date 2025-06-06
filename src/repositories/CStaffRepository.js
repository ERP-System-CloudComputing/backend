import ICStaffRepository from "../interfaces/ICStaffRepository.js"
import { db } from "../config/firebase.js";

export default class CStaffRepository extends ICStaffRepository {
  constructor () {
    super()
    this.collection = db.collection('capacityStaff')
  }
  async create (dataList) {
    const batch = db.batch()
    dataList.forEach(p => {
    const ref = db.collection('capacityStaff').doc()
    batch.set(ref, p)
  })
    await batch.commit()
  }
  async getByCapacityID(capacityID){
    const registers = await this.collection.where('capacityID', '==', capacityID).get()
    return registers.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
    }))
   }
}
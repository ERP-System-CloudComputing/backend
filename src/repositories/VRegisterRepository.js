import { db } from "../config/firebase.js"
export default class VRegisterRepository {
  constructor () {
    // super()
    this.collection = db.collection('voucherRegister')
  }
  // batch ejecuta una sola vez la peticion a firebase con todos los registros
  async create (dataList) {
    const batch = db.batch()
    dataList.forEach(p => {
    const ref = db.collection('voucherRegister').doc()
    batch.set(ref, p)
  })
    await batch.commit()
  }
  async getById(voucherId){
    const registers = await this.collection.where('voucherId', '==', voucherId).get()
    return registers.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
    }))
   }
}
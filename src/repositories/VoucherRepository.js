import IVoucherRepository from "../interfaces/IVoucherRepository.js"
import { db } from "../config/firebase.js"
export default class VoucherRepository extends IVoucherRepository {
  constructor () {
    super()
    this.collection = db.collection('voucher')
  }
  async getAll() {
    const voucher = await this.collection.get()
    return voucher.docs.map((doc) => ({ id:doc.id, ...doc.data() }))
  }
  async create (voucherData) {
    const Newvoucher = await this.collection.add(voucherData)
    return { id: Newvoucher.id, ...voucherData }
  }
  async delete(id){
    await this.collection.doc(id).delete()
    return {
      id,
      message: 'Voucher deleted'
    }
  }
}
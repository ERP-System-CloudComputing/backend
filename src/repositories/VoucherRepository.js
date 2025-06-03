import { db } from "../config/firebase.js"
export default class VoucherRepository {
  constructor () {
    // super()
    this.collection = db.collection('voucher')
  }

  async create (voucherData) {
    const Newvoucher = await this.collection.add(voucherData)
    return { id: Newvoucher.id, ...voucherData }
  }
}
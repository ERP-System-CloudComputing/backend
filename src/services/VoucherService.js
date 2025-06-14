import VoucherRepository from "../repositories/VoucherRepository.js"
import VRegisterRepository from "../repositories/VRegisterRepository.js";
import Vouchers from "../models/Vouchers.js";
import VouchersRegister from "../models/VoucherRegister.js";

export default class VoucherService {
  constructor () {
    this.voucherRepository = new VoucherRepository()
    this.vregisterRepository = new VRegisterRepository()
  }

  async create (voucherData,dataList) {
    const {id} = await this.voucherRepository.create({...voucherData})
    const dataListVoucherID = dataList.map(p => ({...p,voucherId: id}))
    await this.vregisterRepository.create(dataListVoucherID)
    return {message:'Success',id}
  }

  async getAll() {
    return await this.voucherRepository.getAll()
  }
  async getById (id) {
    return await this.vregisterRepository.getById(id)
  }
  async delete (id) {
  const vouchersExists = await this.vregisterRepository.getById(id)

  if (!vouchersExists) {
    throw {
      message: 'Register not found',
      statusCode: 404
    }
  }
  await this.vregisterRepository.delete(id)
  await this.voucherRepository.delete(id)
  return { message: 'Deleted' }
}
}
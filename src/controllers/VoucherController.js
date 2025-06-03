import VoucherService from "../services/VoucherService.js"

export default class VoucherController {
  constructor () {
    this.voucherService = new VoucherService()
  }

  async create(req,res,next) {
    try {
      const {voucher, dataList} = req.body 
      console.log('VOUCHER',voucher, 'lista', dataList)
      const Newvoucher = await this.voucherService.create(voucher,dataList)
      res.status(201).json(Newvoucher)
    } catch (error) {
      next(error)
    }
  }
  async getAll(req,res,next) {
    try {
      console.log('da')
      // const staffs = await this.staffService.getAll()
      // res.json(staffs)
    } catch(error) {
      next(error)
    }
  }
  async 
}
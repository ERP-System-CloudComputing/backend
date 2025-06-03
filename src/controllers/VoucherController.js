import VoucherService from "../services/VoucherService.js"

export default class VoucherController {
  constructor () {
    this.voucherService = new VoucherService()
  }

  async create(req,res,next) {
    try {
      const {voucher, dataList} = req.body 
      const Newvoucher = await this.voucherService.create(voucher,dataList)
      res.status(201).json(Newvoucher)
    } catch (error) {
      next(error)
    }
  }
  async getAll(req,res,next) {
    try {
      const voucher = await this.voucherService.getAll()
      res.json(voucher)
    } catch(error) {
      next(error)
    }
  }

  async getById(req,res,next) {
    try {
      const { id } = req.params 
      const vouchers = await this.voucherService.getById(id)
      res.json(vouchers)
    } catch (error){
      next(error)
    }
  }
  async delete(req,res,next){
    try{
      const { id } = req.params 
      await this.voucherService.delete(id)
      res.status(204).end() // .end termina la peticion 
    }catch(error){
      next(error)
    }
  }
}
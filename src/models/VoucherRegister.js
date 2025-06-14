export default class VouchersRegister {
  constructor({
    classbuy = '',
    description = '',
    qty = '',
    unitPrice = '',
    amount = '',
    vat = '',
    vatAmount = '',
    grossAmount = '',
    wht = '',
    whtAmount = '',
    netAmount = ''
  }){
    this.classbuy = classbuy
    this.description = description
    this.qty = qty
    this.unitPrice = unitPrice
    this.amount = amount
    this.vat = vat
    this.vatAmount = vatAmount
    this.grossAmount = grossAmount
    this.wht = wht
    this.whtAmount = whtAmount
    this.netAmount = netAmount
  }
}
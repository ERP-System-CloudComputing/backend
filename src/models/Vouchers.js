export default class Vouchers {
  constructor({
    userId= '',
    subject= '',
    date= '',
    preparedBy= '',
    sendTo= '',
    accountNumber= '',
    bankName= ''
  }){
    this.userId = userId
    this.subject = subject
    this.date = date
    this.preparedBy = preparedBy
    this.sendTo = sendTo
    this.accountNumber = accountNumber
    this.bankName = bankName
  }
}
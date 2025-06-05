export default class Maintenance {
  constructor({
    itemName = '',
    number = '',
    date = '',
    maintenanceType = '',
    recurring = '',
    status = ''
  }){
    this.itemName = itemName
    this.number = number
    this.date = date
    this.maintenanceType = maintenanceType
    this.recurring = recurring
    this.status = status
  }
}
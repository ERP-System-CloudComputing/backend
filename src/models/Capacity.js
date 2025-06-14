export default class Capacity {
  constructor({
    trainDescription = '',
    trainType = '',
    trainDuration = '',
    trainDate = '',
    trainMode = '',
    trainStatus = ''
  }){
    this.trainDescription = trainDescription,
    this.trainType = trainType,
    this.trainDuration = trainDuration,
    this.trainDate = trainDate,
    this.trainMode = trainMode,
    this.trainStatus = trainStatus
  }
}
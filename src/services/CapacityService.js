import CapacityRepository from "../repositories/CapacityRepository.js"
import CStaffRepository from "../repositories/CStaffRepository.js";
import Capacity from "../modules/Capacity.js";
import CapacityStaff from "../modules/CapacityStaff.js";

export default class CapacityService {
  constructor () {
    this.capacityRepository = new CapacityRepository()
    this.cstaffRepository = new CStaffRepository()
  }

  async create (CapacityData,dataList) {
    const {id} = await this.capacityRepository.create({...CapacityData})
    const dataListCapacityID = dataList.map(p => ({...p,capacityID: id}))
    await this.cstaffRepository.create(dataListCapacityID)
    return {message:'Success',id}
  }
  async getAll() {
    return await this.capacityRepository.getAll()
  }
  async getById (id) {
    return await this.capacityRepository.getById(id)
  }
  async getByCapacityID (id) {
    return await this.cstaffRepository.getByCapacityID(id) 
  }
  async update (id,capacityData){
    const updateCapacity = await this.capacityRepository.getById(id)
    if ( !updateCapacity ) {
      throw { 
        message: 'Capacity not found', 
        statusCode:404
      }
    }
    const newcapacity = new Capacity({...updateCapacity,...capacityData})
    return this.capacityRepository.update(id,{...newcapacity})
  }
}
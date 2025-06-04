import IStaffRepository from "../interfaces/IStaffRepository.js";
import { db } from "../config/firebase.js";

export default class StaffRepository extends IStaffRepository {
  constructor () {
    super()
    this.collection = db.collection('staff')
  }

  async create(staff) {
    const newStaff = await this.collection.add(staff)
    return { id: newStaff.id, ...staff }
  }
  async getAll() {
    const staff = await this.collection.get()
    return staff.docs.map((doc) => ({ id:doc.id, ...doc.data() }))
  }
  async getById(id){
      const staff = await this.collection.doc(id).get()
      return !staff.exists ? null : { id: staff.id, ...staff.data() }
  }
  async getByEmail(personalEmail) {
    const staff = await this.collection.where('personalEmail', '==', personalEmail).get()
    return staff.empty ? null : staff.docs.map(doc => ({ id: doc.id, ...doc.data()}))[0]
  }
  async getByRol(role) {
    const staff = await this.collection.where('role', '==',role).get()
    return staff.empty ? null : { id:staff.docs[0].id, ...staff.docs[0].data() }
  }
  async getByName(name) {
    const staff = await this.collection.where('firstName', '==',name).get()
    return staff.empty ? null : { id:staff.docs[0].id, ...staff.docs[0].data() }
  }
  async getByFullName(firstName,lastName) {
    const staff =  await this.collection.where('firstName','==',firstName).where('lastName','==',lastName).get()
    return staff.empty ? null : { id: staff.docs[0].id, ...staff.docs[0].data() }
  }
  async update(id,staffData) {
    await this.collection.doc(id).update(staffData)
    return {
      id,
      ...staffData
    }
  }
  async delete(id){
    await this.collection.doc(id).delete()
    return {
      id,
      message: 'Staff deleted'
    }
  }

}
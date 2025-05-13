import IPersonalRepository from "../interfaces/IPersonalRepository.js";
import { db } from "../config/firebase.js";

export default class PersonalRepository extends IPersonalRepository {
  constructor () {
    super()
    this.collection = db.collection('personal')
  }

  async create(personal) {
    const newPersonal = await this.collection.add(personal)
    return { id: newPersonal.id, ...personal }
  }

  async findByEmail(email) {
    const personal = await this.collection.where('email', '==', email).get()
    return personal.empty ? null : personal.docs.map(doc => ({ id: doc.id, ...doc.data()}))[0]
  }

}
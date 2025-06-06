import IStaffRepository from "../interfaces/IStaffRepository.js";
import { db } from "../config/firebase.js";

export default class StaffRepository extends IStaffRepository {
  constructor() {
    super()
    this.collection = db.collection('staff')
  }

  async create(staff) {
    const newStaff = await this.collection.add(staff)
    return { id: newStaff.id, ...staff }
  }
  async getAll() {
    const staff = await this.collection.get()
    return staff.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  }
  async getById(id) {
    const staff = await this.collection.doc(id).get()
    return !staff.exists ? null : { id: staff.id, ...staff.data() }
  }
  async getByEmail(personalEmail) {
    const staff = await this.collection.where('personalEmail', '==', personalEmail).get()
    return staff.empty ? null : staff.docs.map(doc => ({ id: doc.id, ...doc.data() }))[0]
  }
  async getByRol(role) {
    const staff = await this.collection.where('role', '==', role).get()
    return staff.empty ? null : { id: staff.docs[0].id, ...staff.docs[0].data() }
  }
  async getByName(name) {
    const staff = await this.collection.where('firstName', '==', name).get()
    return staff.empty ? null : { id: staff.docs[0].id, ...staff.docs[0].data() }
  }
  async getByFullName(firstName, lastName) {
    const staff = await this.collection.where('firstName', '==', firstName).where('lastName', '==', lastName).get()
    return staff.empty ? null : { id: staff.docs[0].id, ...staff.docs[0].data() }
  }
  async update(id, staffData) {
    await this.collection.doc(id).update(staffData)
    return {
      id,
      ...staffData
    }
  }
  async delete(id) {
    await this.collection.doc(id).delete()
    return {
      id,
      message: 'Staff deleted'
    }
  }

  async findByUser(email) {
    const usuario = await this.collection.where('personalEmail', '==', email).get()

    return usuario.empty ? null : { id: usuario.docs[0].id, ...usuario.docs[0].data() };
  }

  // ! === Métodos para actualizar y verificar el token === ! //
  async updateSessionTokens(userID, { accessToken, refreshToken, lastActivity = new Date(), rememberMe }) {
    const userDoc = await this.collection.doc(userID).get();
    if (!userDoc.exists) throw { message: 'User not found', statusCode: 404 };

    const updateData = {
      accessToken,
      refreshToken,
      lastActivity,
      // * Usamos el 'rememberMe' que viene en la llamada
      // * Si rememberMe es undefined en la llamada, entonces toma el valor existente en la DB
      // * Si no existe en la DB, por defecto es false.
      rememberMe: rememberMe !== undefined ? rememberMe : (userDoc.data().rememberMe || false)
    };

    await this.collection.doc(userID).update(updateData);
  }

  async getSessionByToken(userID) {
    const user = await this.collection.doc(userID).get();
    return user.exists ? user.data().accessToken : null;
  }

  async saveVerificationCode(userID, VerificationCode, expiration) {
    await this.collection.doc(userID).update({
      resetCode: VerificationCode,
      resetCodeExpiration: expiration
    });
  }

  async verifiCode(userID, code) {
    const userDoc = await this.collection.doc(userID).get();
    if (!userDoc.exists) return false;

    const user = userDoc.data();
    const nowDate = new Date();

    return (user.resetCode === code && user.resetCodeExpiration.toDate() > nowDate)
  }

  async updatePassword(userID, newPassword) {
    await this.collection.doc(userID).update({
      password: newPassword
    })
  }

  async deleteVerificationCode(userID) {
    const userDoc = await this.collection.doc(userID).get();
    if (!userDoc.exists) throw { message: 'User not found', statusCode: 404 };

    await this.collection.doc(userID).update({
      resetCode: null,
      resetCodeExpiration: null
    })
  }

  async updateLastActivity(userID, lastActivity) {
    const userDoc = await this.collection.doc(userID).get();
    if (!userDoc.exists) throw { message: 'User not found', statusCode: 404 };

    await this.collection.doc(userID).update({
      lastActivity: lastActivity
    });

  }

  async clearSessionTokens(userID) {
    const user = await this.collection.doc(userID).get();

    if (!user.exists) throw { message: 'User not found', statusCode: 404 };

    await this.collection.doc(userID).update({
      accessToken: null,
      refreshToken: null
    })
  }

  //   async findByUser (user) {
  //     const usuario = await this.collection.where('usuario' , '==', user).get()     

  //     return usuario.empty ? null : { id: usuario.docs[0].id, ...usuario.docs[0].data() } 
  //   }
}
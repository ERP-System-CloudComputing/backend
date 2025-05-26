export default class Staff {
  constructor({
    firstName,
    lastName,
    personalEmail,
    phoneNumber,
    gender = '',
    houseNumber,
    role = '',
    designation = '',
    staffID,
    oficialEmail,
    password,
    photo
  }){
    this.firstName = firstName
    this.lastName = lastName
    this.personalEmail = personalEmail
    this.phoneNumber = phoneNumber
    this.gender = gender
    this.role = role
    this.houseNumber = houseNumber
    this.designation = designation
    this.staffID = staffID,
    this.oficialEmail = oficialEmail
    this.password = password
    this.photo = photo
  }
}
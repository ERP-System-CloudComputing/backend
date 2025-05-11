export default class Personal {
  constructor({
    firstName,
    lastName,
    email,
    phoneNumber,
    gender = '',
    role = '',
    designation = '',
    staffID,
    photo
  }){
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.phoneNumber = phoneNumber
    this.gender = gender
    this.role = role
    this.designation = designation
    this.staffID = staffID,
    this.photo = photo
  }
}
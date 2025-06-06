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
    staffID = '',
    officialEmail = '',
    password = '',
    photo = null,
    accessToken = null,
    refreshToken = null,
    lastActivity = null
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
    this.officialEmail = officialEmail
    this.password = password
    this.photo = photo
    this.accessToken = accessToken
    this.refreshToken = refreshToken
    this.lastActivity = lastActivity
  }
}
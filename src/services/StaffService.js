import StaffRepository from "../repositories/StaffRepository.js";
import Staff from "../models/Staff.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

export default class StaffService {
  constructor () {
    this.staffRepository = new StaffRepository()
  }

  async login(personalEmail, password) {
    const user = await this.staffRepository.findByUser(personalEmail);
    if (!user)
        throw { messasge: 'User not found', statusCode: 401 };

    // ! Verificar si ya hay sesion activa
    const tokenExists = await this.staffRepository.getSessionByToken(user.id)
    if (tokenExists)
        throw { messasge: 'You are already logged in', statusCode: 401 };

    // ! Comparar la contraseña encritada
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw { messasge: 'Invalid credentials', statusCode: 401 };
    }

    // * Generamos ambos tokens.
    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    await this.staffRepository.updateSessionTokens(user.id, { accessToken, refreshToken }); //! Actualizar el token en la base de datos para el usuario en concreto
    
    return { accessToken, refreshToken };
  }

  // * Generar token corto 
  generateAccessToken(user) {
    return jwt.sign({ id: user.id, personalEmail: user.personalEmail, rol: user.rol }, process.env.JWT_ACCESS_SECRET, { expiresIn: '20m' });
  }

  // * Generar token largo
  generateRefreshToken(user) {
    return jwt.sign({ id: user.id, personalEmail: user.personalEmail, rol: user.rol}, process.env.JWT_REFRESH_SECRET, { expiresIn: '2d' });
  }

  async refreshAccessToken(refreshToken) {
    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      const user = await this.staffRepository.getById(decoded.id);

      if (!user || user.currentSession !== refreshToken) 
        throw { message: 'Invalid refresh token', statusCode: 401 };

      const newAccessToken = this.generateAccessToken(user);
      const newRefreshToken = this.generateRefreshToken(user);

      // * Actualizar el token en la base de datos:
      await this.staffRepository.updateSessionTokens(user.id, { accessToken: newAccessToken, refreshToken: newRefreshToken });

      return { accessToken: newAccessToken, refreshToken: newRefreshToken };

    } catch (error) {
      throw { message: 'Invalid refresh token', statusCode: 401 };
    }
  }

  
  async logout(userId) {
    await this.staffRepository.updateSessionTokens(userId, { accessToken: null, refreshToken: null });
  }


  async create(staffData) {
    
    const { firstName, lastName, personalEmail, password } = staffData
    const uniqueStaff = await this.staffRepository.getByEmail(personalEmail)
    if (uniqueStaff) {
      throw { 
        message: 'There is already a staff with the same personal email', 
        statusCode:400
      }
    }
    const uniqueFullName = await this.staffRepository.getByFullName(firstName,lastName)
      if(uniqueFullName){
         throw {
            message: 'There is already a staff with the full name',
            statusCode: 400
         }
      }
    const hashedPassword = await bcrypt.hash(password,10) 
    const newStaff = new Staff({...staffData, password: hashedPassword}) // -Toma todo el objeto y solo cambia el password hash 
    return this.staffRepository.create({...newStaff})
  }


  async getAll() {
    return await this.staffRepository.getAll()
  }

  async getByRol (rol) {
    return await this.staffRepository.getByRol(rol)
  }

  async update (id,staffData){
    const { password } = staffData 
    const updateStaff = await this.staffRepository.getById(id)
    if ( !updateStaff ) {
      throw { 
        message: 'Staff not found', 
        statusCode:404
      }
    }
    if (password) {
      staffData.password = await bcrypt.hash(password,10)
    }
    const newStaff = new Staff({...updateStaff,...staffData})
    return this.staffRepository.update(id,{...newStaff})
  }

  async delete (id) {
    const staffExists = await this.staffRepository.getById(id)
    if( !staffExists) {
      throw {
        message: 'Staff not found',
        statusCode: 404
      }
    }
    await this.staffRepository.delete(id)
  }

}
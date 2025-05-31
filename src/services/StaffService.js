import StaffRepository from "../repositories/StaffRepository.js";
import Staff from "../models/Staff.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { sendVerificationCode, sendEmailInstructions } from "../classes/Email.js";

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
                                                                                                                  
  async requestPasswordReset(personalEmail) {
    const user = await this.staffRepository.findByUser(personalEmail);
    if (!user) 
      throw { message: 'Verification Code Wrong, user not found', statusCode: 404 };
    
    // * Generacion de codigo de verificacion 6 digitos:
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiration = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos de expiracion
    
    // * Guardar el codigo de verificacion en la base de datos
    await this.staffRepository.saveVerificationCode(user.id, verificationCode, expiration);

    // * Enviamos codigo de verificacion por email:
    await sendVerificationCode(personalEmail, verificationCode)

    return { message: 'Verification code sent successfully', success: true };
  }

  async sendEmail(personalEmail) {
    const user = await this.staffRepository.findByUser(personalEmail);
    if (!user)
      throw { message: 'User not found, check with an administrator', statusCode: 404 };

    // * Enviar instrucciones por Email:
    await sendEmailInstructions(personalEmail)

    return { message: 'Verification code sent successfully', success: true };
  }

  async verifyTokendAndSendCode(token) {
    try {
      // * Verificamos token:
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      if (decoded.purpose!== 'password_reset_init')
        throw { message: 'Invalid token', statusCode: 400 };

      const user = await this.staffRepository.findByUser(decoded.email);
      if (!user) 
        throw { message: 'Usuario no encontrado', statusCode: 404 };
      
      // * Enviamos instrucciones con metodo requestPasswordReset:
      await this.requestPasswordReset(decoded.email)
    } catch (error) {
      throw { message: 'Invalid or expired token', statusCode: 400 };
    }
  }

  async verifyResetCode(personalEmail, code) {
    const user = await this.staffRepository.findByUser(personalEmail);
    if (!user)
      throw { message: 'User not found', statusCode: 404 };

    // * Verificar si el codigo de verificacion es valido:
    const isValid = await this.staffRepository.verifiCode(user.id, code);
    if (!isValid)
      throw { message: 'Expired or Invalid verification code', statusCode: 400 };

    // * Generamos token para cambio de contraseña:
    const resetToken = jwt.sign({ id: user.id, purpose: 'password_reset' }, process.env.JWT_ACCESS_SECRET, { expiresIn: '20m' });

    return { resetToken };
  }

  async resetPassword(token, newPassword) {
    try {
      // * Verificamos token:
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      if (decoded.purpose !== 'password_reset')
        throw { message: 'Invalid token purpose', statusCode: 400 };

      // * Hasheamos la nueva contraseña:
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // * Actualizamos la contraseña en la base de datos:
      await this.staffRepository.updatePassword(decoded.id, hashedPassword);

      // * Eliminamos el codigo de verificacion de la base de datos, y la fecha de expiracion del codigo de verificacion en la base de datos:
      await this.staffRepository.deleteVerificationCode(decoded.id, null, null);

      return { message: 'Password reset successful', success: true}

    } catch (error) {
      if (error.name === 'TokenExpiredError') 
        throw { message: 'El enlace ha expirado', statusCode: 401 };
      
      throw { message: error.message || 'Invalid or expired token', statusCode: 400 };
    }
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

  async getByEmail() {
    return await this.staffRepository.getByEmail()
  }

  async getAll() {
    return await this.staffRepository.getAll()
  }

  async getByRol (rol) {
    return await this.staffRepository.getByRol(rol)
  }

  async getByName (name) {
    return await this.staffRepository.getByName(name)
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


  async logout(userId) {
    // * Eliminamos tokens de sesion de la DB:
    await this.staffRepository.clearSessionTokens(userId);
  }

}
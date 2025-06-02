import StaffService from '../services/StaffService.js'
import jwt from 'jsonwebtoken';

export default class StaffController{
  constructor () {
    this.staffService = new StaffService()
  }

  async login(req, res, next) {
    try {
      const { personalEmail, password, rememberMe } = req.body
      if (!personalEmail || !password) {
         return res.status(400).json({ message: 'Email and password are required', success: false });
      }
      
      const { accessToken, refreshToken } = await this.staffService.login(personalEmail, password);
      // * Configuracion de cookie para mantener la sesion iniciada:
      const cookiesOptions = {
        httpOnly: true,
        secure: false, // * De momento false permitiendo que la cookie se pueda enviar a través de HTTP (necesario para pruebas locales sin HTTPS)
        sameSite: 'lax', // * stric -> Evitamos que el navegador envie la cookie en peticiones cross-site
        path: '/',
        // Si rememberMe es false, no establecemos maxAge para que sea una cookie de sesión:
        ...(rememberMe ? { maxAge: 2 * 24 * 60 * 60 * 1000 } : {} )
      };

      res.cookie('refreshToken', refreshToken, cookiesOptions);
      res.json({ accessToken, refreshToken, expireIn: 20 * 60, success: true }); // * 20 min
      
    } catch (error) {
      // *  Solo limpiar cookies si NO es un error de credenciales
      res.clearCookie('refreshToken');
      if (error.isCredentialError) {
         return res.status(400).json({ message: 'Invalid email or password, please try again' , success: false });
      }
      next(error);
    }
  }
  
  async refreshToken(req, res, next) {
    try {
      const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
      if (!refreshToken) 
        return res.status(401).json({ message: 'Refresh token no proporcionado en Controlador', statusCode: 401, success: false });

      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      const user = await this.staffService.getById(decoded.id);
      if (!user) 
         throw { message: 'User not found', statusCode: 404, isCredentialError: true };

      if (user.refreshToken !== refreshToken) {
         // * Si el refresh token no coincide con el almacenado, lanzamos un error:
         throw { message: 'Invalid RefreshToken stored', statusCode: 401, isTokenError: true };
      }

      // * Verificamos si el usuario esta inactivo (ultima actividad > 20 min)
      // * Si todo esta bien, procedemos a refrescar el token: 
      const { accessToken, refreshToken: newRefreshToken } = await this.staffService.refreshAccessToken(refreshToken);

      // * Actualizamos la cookie si existe:
      if (req.cookies.refreshToken) {
        res.cookie('refreshToken', newRefreshToken, {
          httpOnly: true,
          secure: false,
          maxAge: 2 * 24 * 60 * 60 * 1000, // 2 dias en milisegundos
          sameSite:'lax'
        });
      }
      res.json({ accessToken, expireIn: 20 * 60 });

    } catch (error) {
      res.clearCookie('refreshToken');
      if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') {
         return res.status(401).json({ message: 'Invalid Refresh Token', statusCode: 401, success: false });
      }
      next(error);
    }
  }

  async requestPasswordReset(req, res, next) {
    try {
      const { personalEmail } = req.body;
      await this.staffService.requestPasswordReset(personalEmail)
      res.json({ message: 'Verification code sent successfully', success: true });
    } catch (error) {
      next(error);
    }
  }

  async sendEmail(req, res, next) {
    try {
      const { personalEmail } = req.body;
      await this.staffService.sendEmail(personalEmail)
      res.json({ message: 'Instructions sent successfully', success: true });
    } catch (error) {
      next(error);
    }
  }

  async verifyTokendAndSendCode(req, res, next) {
    try {
      const { token } = req.body;
      const result = await this.staffService.verifyTokendAndSendCode(token);
      res.json(result);

    } catch (error) {
      next(error);
    }
  }

  async verifyResetCode(req, res, next) {
    try {
      const { personalEmail, code } = req.body;
      const { resetToken } = await this.staffService.verifyResetCode(personalEmail, code);
      res.json({ resetToken });

    } catch (error) {
      next(error);
    }
  }

  async resetPassword(req, res, next) {
    try {
      const { token, newPassword } = req.body;
      const { resetToken } = await this.staffService.resetPassword(token, newPassword);
      res.json({ resetToken });

    } catch (error) {
      next(error);
    }
  }

  async create(req,res,next) {
    try{
      const staff = await this.staffService.create(req.body)
      res.status(201).json(staff)
    }catch(error) {
      next(error)
    }
  }
  async getAll(req,res,next) {
    try {
      const staffs = await this.staffService.getAll()
      res.json(staffs)
    } catch(error) {
      next(error)
    }
  }
  async getByRol(req,res,next) {
    try {
      const { role } = req.params 
      const staffs = await this.staffService.getByRol(role)
      res.json(staffs)
    } catch (error){
      next(error)
    }
  }
  async getByName(req,res,next) {
    try {
      const { name } = req.params 
      const staffs = await this.staffService.getByName(name)
      res.json(staffs)
    } catch (error){
      next(error)
    }
  }
  async update(req,res,next){
    try{
      const { id } = req.params
      const staffData = req.body
      const staff = await this.staffService.update(id, staffData)
      res.json(staff)
    }catch(error){
      next(error)
    }
  }
  async delete(req,res,next){
    try{
      const { id } = req.params 
      await this.staffService.delete(id)
      res.status(204).end() // .end termina la peticion 
    }catch(error){
      next(error)
    }
  }

  async logout(req, res, next) {
    try {
      // * 1. Limpiamos cookies de autenticación:
      res.clearCookie('refreshToken', {
         httpOnly: true,
         secure: false, // * De momento false permitiendo que la cookie se pueda enviar a través de HTTP (necesario para pruebas locales sin HTTPS)
         sameSite: 'lax'
       });
      
      // * 2. Intentamos obtener el refresh token de las cookies:
      const refreshToken = req.cookies?.refreshToken || req.body?.refreshToken;
      // console.log('Refresh Token:', refreshToken);
   
      // * 3. Verificamos que el refresh token exista:
      if (refreshToken) {
         try {
            const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
            await this.staffService.logout(decoded.id);
         } catch (error) {
            console.error('Error al verificar el refresh token:', error.message);
         }
      }

      // * 4. Limpiar cookies en la respuesta
      this.clearCookie(res);

      // * Invalidamos el token de acceso actual:
      res.status(204).end();
    } catch (error) {
      console.error('Error en logout:', error);
      res.clearCookie('refreshToken');
      next(error);
    }
  }

  clearCookie(res) {
    res.clearCookie('auth._token.local');
    res.clearCookie('auth._token_expiration.local');
    res.clearCookie('auth.strategy');
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: false, // * De momento false permitiendo que la cookie se pueda enviar a través de HTTP (necesario para pruebas locales sin HTTPS)
        sameSite: 'lax'
    });
  }

   // * METODO PARA VALIDAR TOKEN EN 'MANTENER SESION INICIADA':
   async validateToken(req, res) {
      try {
         const token = req.headers.authorization?.split(' ')[1];
         if (!token) 
            return res.status(401).json({ message: 'Invalid Token', valid: false });
         
         const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
         const user = await this.staffService.getByEmail(decoded.email);
         
         if (!user || !user.refreshToken) 
            return res.status(404).json({ message: 'Usuario no encontrado o token invalido', valid: false });

         return res.json({ valid: true });
      } catch (error) {
         console.error('Error en validateToken:', error);
         return res.status(500).json({ message: 'Invalid Token', valid: false  });
      }
   }   

}

import StaffService from '../services/StaffService.js'
export default class StaffController{
  constructor () {
    this.staffService = new StaffService()
  }

  async login(req, res, next) {
    try {
      const { personalEmail, password, rememberMe } = req.body
      const { accessToken, refreshToken } = await this.staffService.login(personalEmail, password);
      
      // * Configuracion de cookie para mantener la sesion iniciada:
      const cookiesOptions = {
        httpOnly: true,
        secure: false, // * De momento false permitiendo que la cookie se pueda enviar a través de HTTP (necesario para pruebas locales sin HTTPS)
        sameSite: 'lax' // * stric -> Evitamos que el navegador envie la cookie en peticiones cross-site
      };

      if (rememberMe) {
        cookiesOptions.maxAge = 2 * 24 * 60 * 60 * 1000 // 2 dias en milisegundos
      }

      res.cookie('refreshToken', refreshToken, cookiesOptions);
      res.json({ accessToken, expireIn: 20 * 60 }); // * 20 min
      
    } catch (error) {
      next(error);
    }
  }
  
  async refreshToken(req, res, next) {
    try {
      const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
      if (!refreshToken) 
        throw { message: 'Refresh token no proporcionado en Controlador', statusCode: 401 };
    
      const { accessToken, refreshToken: newRefreshToken } = await this.staffService.refreshAccessToken(refreshToken);

      // * Actualizamos la cookie si existe:
      if (req.cookie.refreshToken) {
        res.cookie('refreshToken', newRefreshToken, {
          httpOnly: true,
          secure: false,
          maxAge: 2 * 24 * 60 * 60 * 1000, // 2 dias en milisegundos
          sameSite:'lax'
        });
      }
      res.json({ accessToken, expireIn: 20 * 60 });
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const userId = req.user.id;
      await this.staffService.logout(userId);
        
      res.clearCookie('refreshToken');
      res.status(204).end();
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

}
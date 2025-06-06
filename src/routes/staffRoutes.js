import {Router} from 'express'
import StaffController from '../controllers/StaffController.js'
import authMiddleware from '../middleware/authMiddleware.js'
const router = Router()
const staffController = new StaffController()

const staffRoutes = [
  // ! === Ruta para login a los usuarios === ! //
  {
    method: 'post',
    path: '/login',
    // middleware: [authMiddleware, roleMiddleware('admin', 'soporte')],
    handler: 'login'
  },
  {
    method: 'post',
    path: '/refresh-token',
    middleware: [],
    handler: 'refreshToken'
  },
  {
    method: 'post',
    path: '/send-email',
    handler: 'sendEmail'
  },
  {
    method: 'post',
    path: '/request-password-reset',
    handler: 'requestPasswordReset'
  },
  {
    method: 'post',
    path: '/verify-token-and-send-code',
    handler: 'verifyTokendAndSendCode'
  },
  {
    method: 'post',
    path: '/verify-reset-code',
    handler: 'verifyResetCode'
  },
  {
    method: 'post',
    path: '/reset-password',
    handler: 'resetPassword'
  },
  {
    method: 'get',
    path: '/getAll',
    //middleware: [],
    handler: 'getAll'
  },
  {
    method: 'get',
    path: '/getByRol/:role', 
    // middleware: [],
    handler: 'getByRol'
  },
  {
    method: 'get',
    path: '/getByName/:name', 
    // middleware: [],
    handler: 'getByName'
  },
  {
    method: 'post',
    path: '/create',
    //middleware: [],
    handler: 'create'
  },
  {
    method: 'put',
    path: '/update/:id',
    // middleware: [],
    handler: 'update'
  },
  {
    method: 'delete',
    path: '/delete/:id',
    // middleware: [],
    handler: 'delete'
  },
  {
    method: 'post',
    path: '/logout',
    // middleware: [],
    handler: 'logout'
  },
  {
    method: 'get',
    path: '/validate-token',
    handler: 'validateToken'
  },
  // ! === Ruta para obtener un usuario y mandarlo al frontend === ! //
   {
    method: 'get',
    path: '/user',
    middleware: [authMiddleware],
    handler: 'getUser'
  },
] 

staffRoutes.forEach( route => {
  router[route.method](
    route.path,
    ...(route.middleware || []),
    staffController[route.handler].bind(staffController)
  )
})

export default router 
import {Router} from 'express'
import VoucherController from '../controllers/VoucherController.js'
const router = Router()
const voucherController = new VoucherController()

const voucherRoutes = [
  {
    method: 'get',
    path: '/getAll',
    //middleware: [],
    handler: 'getAll'
  },
  {
    method: 'get',
    path: '/getById/:id',
    //middleware: [],
    handler: 'getById'
  },
  {
    // Agregar el ID del usuario que crea el voucher /create/:id
    method: 'post',
    path: '/create',
    //middleware: [],
    handler: 'create'
  },
  {
    method: 'delete',
    path: '/delete/:id',
    // middleware: [],
    handler: 'delete'
  }
] 

voucherRoutes.forEach( route => {
  router[route.method](
    route.path,
    ...(route.middleware || []),
    voucherController[route.handler].bind(voucherController)
  )
})

export default router 
import {Router} from 'express'
import VoucherController from '../controllers/voucherController.js'
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
    // Agregar el ID del usuario que crea el voucher /create/:id
    method: 'post',
    path: '/create',
    //middleware: [],
    handler: 'create'
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
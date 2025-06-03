import {Router} from 'express'
import voucherController from '../controllers/voucherController.js'
const router = Router()
const voucherController = new voucherController()

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
    // middleware: [],
    handler: 'getById'
  },
  {
    method: 'get',
    path: '/getByName/:name', 
    // middleware: [],
    handler: 'getByName'
  },
  {
    // Agregar el ID del usuario que crea el voucher /create/:id
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
] 

voucherRoutes.forEach( route => {
  router[route.method](
    route.path,
    ...(route.middleware || []),
    voucherController[route.handler].bind(voucherController)
  )
})

export default router 
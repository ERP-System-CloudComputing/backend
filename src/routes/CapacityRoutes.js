import {Router} from 'express'
import CapacityController from '../controllers/CapacityController.js'
const router = Router()
const capacityController = new CapacityController()

const capacityRoutes = [
  {
    // Agregar el ID del usuario que crea el voucher /create/:id
    method: 'post',
    path: '/create',
    //middleware: [],
    handler: 'create'
  },
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
    method: 'get',
    path: '/getByCapacityID/:id',
    //middleware: [],
    handler: 'getByCapacityID'
  },
  {
    method: 'put',
    path: '/update/:id',
    // middleware: [],
    handler: 'update'
  }
] 

capacityRoutes.forEach( route => {
  router[route.method](
    route.path,
    ...(route.middleware || []),
    capacityController[route.handler].bind(capacityController)
  )
})

export default router 
import {Router} from 'express'
import MaintenanceController from '../controllers/MaintenanceController.js'
const router = Router()
const maintenanceController = new MaintenanceController()

const maintenanceRoutes = [
  {
    method: 'get',
    path: '/getAll',
    //middleware: [],
    handler: 'getAll'
  },
  {
    method: 'get',
    path: '/getByDate/:date', 
    // middleware: [],
    handler: 'getByDate'
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
  }
] 

maintenanceRoutes.forEach( route => {
  router[route.method](
    route.path,
    ...(route.middleware || []),
    maintenanceController[route.handler].bind(maintenanceController)
  )
})

export default router 
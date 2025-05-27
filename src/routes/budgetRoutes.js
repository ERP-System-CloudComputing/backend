import { Router } from 'express'
import BudgetController from '../controllers/BudgetController'
import AnualBudgetsController from '../controllers/AnualBudgetsController'
const router = Router()
const staffController = new StaffController()

const staffRoutes = [
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

staffRoutes.forEach( route => {
  router[route.method](
    route.path,
    ...(route.middleware || []),
    staffController[route.handler].bind(staffController)
  )
})

export default router 
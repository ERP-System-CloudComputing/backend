import { Router } from "express";
import SalaryDefinitionController from "../controllers/salaryDefinitionController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router()
const salaryDefinitionController = new SalaryDefinitionController()

const salaryDefinitionRoutes = [

  // ! === Ruta para crear a los pacientes === ! //
  {
    method: 'post',
    path: '/create',
    // middleware: [authMiddleware],
    handler: 'create'
  },
  // ! === Ruta para obtener todos los usuarios === ! //  
  {
    method: 'get',
    path: '/users',
    // middleware: [authMiddleware],
    handler: 'getAll'
  }
]

salaryDefinitionRoutes.forEach( route => {
  router[route.method](
    route.path,
    ...(route.middleware || []),
    salaryDefinitionController[route.handler].bind(salaryDefinitionController)
  )
})

export default router 
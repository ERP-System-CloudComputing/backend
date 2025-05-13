import {Router} from 'express'
import PersonalController from '../controllers/PersonalController.js'

const router = Router()
const personalController = new PersonalController()

const personalRoutes = [
  {
    method: 'post',
    path: '/create',
    //middleware: [],
    handler: 'create'
  }
] 

personalRoutes.forEach( route => {
  router[route.method](
    route.path,
     personalController[route.handler].bind(personalController)
  )
})

export default router 
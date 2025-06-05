import { Router } from 'express'
import LogisticsController from '../controllers/LogisticsController.js'

const logisticsController = new LogisticsController()

const router = Router()

const logisticsRoutes = [
    {
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
    }
]

logisticsRoutes.forEach( route => {
    router[route.method](
        route.path,
        ...(route.middleware || []),
        logisticsController[route.handler].bind(logisticsController)
    )
})

export default router 
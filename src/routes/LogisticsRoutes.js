import { Router } from 'express'
import LogisticsController from '../controllers/LogisticsController.js'
import path from 'path'

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
    },
    {
        method: 'get',
        path: '/info',
        //middleware: [],
        handler: 'getInfo'
    },
    {
        method: 'get',
        path: '/:id',
        //middleware: [],
        handler: 'getById'
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
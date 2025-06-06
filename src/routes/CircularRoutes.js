import { Router } from 'express'
import CircularController from '../controllers/CircularController.js'

const router = Router()
const circularController = new CircularController()

const circularRoutes = [
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
        path: '/:id',
        //middleware: [],
        handler: 'getById'
    },
    {
        method: 'put',
        path: '/update/:id',
        //middleware: [],
        handler: 'update'
    }
]

circularRoutes.forEach( route => {
    router[route.method](
        route.path,
        ...(route.middleware || []),
        circularController[route.handler].bind(circularController)
    )
})

export default router 
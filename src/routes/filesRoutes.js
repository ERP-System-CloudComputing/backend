import { Router } from 'express'

const router = Router()

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
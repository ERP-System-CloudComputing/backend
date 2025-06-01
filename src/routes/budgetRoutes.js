import { Router } from 'express'
import BudgetController from '../controllers/BudgetController.js'

const router = Router()
const budgetController = new BudgetController()

const budgetRoutes = [
    {
        method: 'get',
        path: '/getAll',
        //middleware: [],
        handler: 'getAll'
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
    {
        method: 'get',
        path: '/getAllPending',
        //middleware: [],
        handler: 'getAllPending'
    },
    {
        method: 'get',
        path: '/getAllApproved',
        //middleware: [],
        handler: 'getAllApproved'
    }
]

budgetRoutes.forEach( route => {
    router[route.method](
        route.path,
        ...(route.middleware || []),
        budgetController[route.handler].bind(budgetController)
    )
})

export default router 
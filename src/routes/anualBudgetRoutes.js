import { Router } from "express"
import AnualBudgetsController from "../controllers/AnualBudgetsController.js"

const router = Router()
const anualBudgetsController = new AnualBudgetsController()

const anualBudgetRoutes = [
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
    }
]

anualBudgetRoutes.forEach(route => {
    router[route.method](
        route.path,
        ...(route.middleware || []),
        anualBudgetsController[route.handler].bind(anualBudgetsController)
    )
})

export default router
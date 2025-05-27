import { Router } from "express"
import AnualBudgetsController from "../controllers/AnualBudgetsController.js"

const router = Router()
const anualBudgetsController = new AnualBudgetsController()

const anualBudgetRoutes = [
    {
        method: 'post',
        path: '/create',
        //middleware: [],
        handler: 'create'
    },
    {
        method: 'get',
        path: '/:id',
        //middleware: [],
        handler: 'getById'
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
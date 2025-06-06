import { Router } from "express";
import StockController from "../controllers/StockController.js";
import path from "path";

const router = Router();

const stockController = new StockController();

const stockRoutes = [
    {
        method: 'post',
        path: '/create',
        handler: 'create',
    },
    {
        method: 'get',
        path: '/getAll',
        handler: 'getAll',
    }
]


stockRoutes.forEach( route => {
    router[route.method](
        route.path,
        ...(route.middleware || []),
        stockController[route.handler].bind(stockController)
    )
})

export default router;
import { Router } from "express";
import MemoController from "../controllers/MemoController.js";
import path from "path";

const router = Router();

const memoController = new MemoController();

const memoRoutes = [
    {
        method: 'post',
        path: '/create',
        handler: 'create',
    },
    {
        method: 'get',
        path: '/getAll',
        handler: 'getAll',
    },
    {
        method: 'get',
        path: '/:id',
        handler: 'getById'
    },
    {
        method: 'put',
        path: '/action/:id',
        handler: 'action'
    }
]


memoRoutes.forEach( route => {
    router[route.method](
        route.path,
        ...(route.middleware || []),
        memoController[route.handler].bind(memoController)
    )
})

export default router;
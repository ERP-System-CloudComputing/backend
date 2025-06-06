import { Router } from "express";
import MemoController from "../controllers/MemoController.js";

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
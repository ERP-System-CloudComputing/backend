import { Router } from "express";
import BeneficiaryController from "../controllers/BeneficiaryController.js";
import path from "path";

const router = Router();

const beneficiaryController = new BeneficiaryController();

const beneficiaryRoutes = {
    {
        method: 'post',
        path: '/create',
        handler: 'create',
    },
    {
        method: 'get',
        path: '/:id',
        handler: 'getById'
    }
}


beneficiaryRoutes.forEach( route => {
    router[route.method](
        route.path,
        ...(route.middleware || []),
        beneficiaryController[route.handler].bind(beneficiaryController)
    )
})
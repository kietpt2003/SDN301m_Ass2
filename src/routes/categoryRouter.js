import express from 'express';
import { getCategories } from '../controller/apiController'

const router = express.Router();

const initCategoryRouter = (app) => {
    router.get('/users', getCategories); //method get <=> read data

    return app.use('/categories', router);
}

export {
    initCategoryRouter
}
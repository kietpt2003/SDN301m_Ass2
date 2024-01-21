import express from 'express';
import { getCategories, postCategory } from '../controller/categoriesController'

const router = express.Router();

const initCategoryRouter = (app) => {
    router.get('/', getCategories); //method get <=> read data
    router.post('/', postCategory)

    return app.use('/categories', router);
}

export {
    initCategoryRouter
}
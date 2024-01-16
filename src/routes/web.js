import express from 'express';
import { getHomePage } from '../controller/homeController';

const router = express.Router();

const initWebRouter = (app) => {
    router.get('/', getHomePage);

    return app.use('/', router);
}

export {
    initWebRouter
}
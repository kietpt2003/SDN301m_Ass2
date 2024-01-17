const router = require("express").Router();
import { getCategories } from '../controller/apiController'

const iniAPIRoute = (app) => {
    router.get('/users', getCategories); //method get <=> read data

    return app.use('/categories', router);
}

export {
    iniAPIRoute
};
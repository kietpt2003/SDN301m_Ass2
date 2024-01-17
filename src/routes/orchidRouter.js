const router = require("express").Router();
import { getHomePage } from '../controller/homeController';

const iniOrchidRoute = (app) => {
    router.get('/', getHomePage);

    return app.use('/Orchids', router);
}

export {
    iniOrchidRoute
};
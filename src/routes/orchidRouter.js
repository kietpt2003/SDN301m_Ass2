const router = require("express").Router();
import { OrchidsPage } from '../controller/orchidsController';

const iniOrchidRoute = (app) => {
    router.get('/', OrchidsPage);

    return app.use('/Orchids', router);
}

export {
    iniOrchidRoute
};
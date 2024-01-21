import dotenv from 'dotenv';
import { configENV } from './config/configENV';
import express from 'express';
import { configLog } from './config/configLogServer';
import { configViewEngine } from './config/viewEngine';
import { initCategoryRouter } from './routes/categoryRouter';
import { iniOrchidRoute } from './routes/orchidRouter';
import { configBodyParse } from './config/configBodyParser';
const app = express();

//Config Body-Parser
configBodyParse(app);

//Config .env
configENV(dotenv);

//Config check log server
configLog(app);

//config template engine and config static files
configViewEngine(app);


app.get('/', function (req, res) {
    res.redirect('/Orchids');
});
//Init category routes
initCategoryRouter(app);

//Init orchid routes
iniOrchidRoute(app);

const port = process.env.PORT || 8888;

app.listen(port, () => {
    console.log('Server is running on port: ', port);
})

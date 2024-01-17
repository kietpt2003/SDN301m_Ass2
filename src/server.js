import dotenv from 'dotenv';
import { configENV } from './config/configENV';
import express from 'express';
import { configLog } from './config/configLogServer';
import { configViewEngine } from './config/viewEngine';
import { initWebRouter } from './routes/web';
import { iniAPIRoute } from './routes/api';
const app = express();

//Config .env
configENV(dotenv);

//Config check log server
configLog(app);

//config template engine and config static files
configViewEngine(app);


app.get('/', function (req, res) {
    res.redirect('/Orchids');
});
//Init web routes
initWebRouter(app);

//Init api routes
iniAPIRoute(app);

const port = process.env.PORT || 8888;

app.listen(port, () => {
    console.log('Server is running on port: ', port);
})

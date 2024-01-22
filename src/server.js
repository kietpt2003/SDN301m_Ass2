import dotenv from 'dotenv';
import { configENV } from './config/configENV';
import express from 'express';
import { configLog } from './config/configLogServer';
import { configViewEngine } from './config/viewEngine';
import { initCategoryRouter } from './routes/categoryRouter';
import { iniOrchidRoute } from './routes/orchidRouter';
import { configBodyParse } from './config/configBodyParser';

// import mongoose from 'mongoose';
// import Categories from './models/Categories';
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

// const exampleData = [
//     {
//         name: 'Cattleya',
//         description: 'The Queen of orchids',
//     },
//     {
//         name: 'Dendrobium',
//         description: 'Known for diversity and durability',
//     },
//     {
//         name: 'Phalaenopsis',
//         description: 'Often called the Moth Orchid',
//     },
//     {
//         name: 'Oncidium',
//         description: 'Recognized by its dancing lady-shaped flowers',
//     },
//     {
//         name: 'Vanda',
//         description: 'Known for large, vibrant flowers',
//     },
//     {
//         name: 'Cymbidium',
//         description: 'Popular for its use in corsages',
//     },
//     {
//         name: 'Miltonia',
//         description: 'Nicknamed the Pansy Orchid',
//     },
//     {
//         name: 'Masdevallia',
//         description: 'Distinctive for its showy and colorful blooms',
//     },
//     {
//         name: 'Epidendrum',
//         description: 'Characterized by its reed-like stems',
//     },
//     {
//         name: 'Laelia',
//         description: 'Often fragrant and elegant in appearance',
//     },
// ];
// const url = 'mongodb://localhost:27017/shoppingFlower';
// const connect = mongoose.connect(url, { family: 4 });

// connect.then(() => {

//     console.log('Connected correctly to server');

//     Categories.insertMany(exampleData)
//         .then((cate) => {
//             console.log(cate);
//         })
//         .catch((err) => {
//             console.log(err);
//         });

// });

const port = process.env.PORT || 8888;

app.listen(port, () => {
    console.log('Server is running on port: ', port);
})

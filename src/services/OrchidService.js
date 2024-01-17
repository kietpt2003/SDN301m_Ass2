import mongoose from "mongoose";
import Orchids from '../models/Orchids'

export const getAllOrchids = async () => {
    const url = 'mongodb://localhost:27017/shoppingFlower';
    const connect = mongoose.connect(url, { family: 4 });
    let arrOrchids = [];

    arrOrchids = connect.then(() => {
        console.log('Connected correctly to server');

        return Orchids.find({})
            .then((orchids) => {
                return orchids;
            })
            .catch((err) => {
                console.log(err);
                arrOrchids = [];
            });
    });

    return arrOrchids;
}
import mongoose from 'mongoose';
import Categories from '../models/Categories'
// import { connectDB } from "../config/configDB";

export const getAllCategories = async () => {
    const url = process.env.URL_DB;
    const connect = mongoose.connect(url, { family: 4 });
    let arrCategories = [];

    arrCategories = connect.then(() => {
        console.log('Connected correctly to server');
        return Categories.find({})
            .then((categories) => {
                return categories;
            })
            .catch((err) => {
                console.log(err);
                arrCategories = [];
            });
    });

    return arrCategories;
}

export const createCategory = async (newCategory) => {
    return new Promise(async (resolve, reject) => {
        try {
            let error = {}
            let isError = false
            let isExist = await checkCateName(newCategory.cateName);
            if (isExist) {
                error.isDup = 'Name Duplicated'
                resolve(error)
            }
            if (newCategory.cateName === '') {
                error.isEmptyName = 'Name cannot be empty';
                isError = true;
            }
            if (newCategory.description === '') {
                error.isEmptyDes = 'Description cannot be empty';
                isError = true;
            }
            if (isError) {
                resolve(error)
            }
            const url = process.env.URL_DB;
            const connect = mongoose.connect(url, { family: 4 });
            connect.then(() => {
                Categories({ name: newCategory.cateName, description: newCategory.description }).save()
                    .then((cate) => {
                        if (cate) {
                            resolve(getAllCategories());
                        } else {
                            error.createfailed = 'Something wrong'
                        }
                    });
            })
        } catch (error) {
            reject(error)
        }
    })
}

let checkCateName = (name) => {
    return new Promise(async (resolve, reject) => {
        try {
            let category = await Categories.findOne({ name: name })
                .then((category) => {
                    console.log('check: ', category)
                    return category;
                })
                .catch((err) => {
                    console.log(err);
                });
            if (category) {
                resolve(true);
            }
            resolve(false);
        } catch (error) {
            reject(error)
        }
    })
}

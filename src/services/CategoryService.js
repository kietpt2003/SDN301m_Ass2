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
            let arr = await getAllCategories();
            if (newCategory.cateName === '' || newCategory.cateName === undefined) {
                error.isEmptyName = 'Name cannot be empty';
                isError = true;
            }
            if (newCategory.description === '' || newCategory.description === undefined) {
                error.isEmptyDes = 'Description cannot be empty';
                isError = true;
            }
            if (isError) {
                resolve({
                    error: error,
                    arrCategories: arr
                })
            }
            let isExist = await checkCateName(newCategory.cateName);
            if (isExist) {
                console.log('dup name');
                error.isDup = 'Name Duplicated';
                isError = true;
                resolve({
                    error: error,
                    arrCategories: arr
                })
            }
            if (!isError) {
                const url = process.env.URL_DB;
                const connect = mongoose.connect(url, { family: 4 });
                connect.then(() => {
                    Categories({ name: newCategory.cateName, description: newCategory.description }).save()
                        .then(async (cate) => {
                            if (cate) {
                                arr = await getAllCategories();
                                resolve({
                                    arrCategories: arr,
                                    isSuccess: true
                                });
                            } else {
                                error.createfailed = 'Something wrong';
                                resolve({
                                    error: error,
                                    arrCategories: arr
                                })
                            }
                        });
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let checkCateName = (name) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('hahah ', name);
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

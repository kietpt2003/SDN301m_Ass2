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
            .then(async (categories) => {
                await mongoose.disconnect();
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
                                await mongoose.disconnect();
                                resolve({
                                    arrCategories: arr,
                                    isSuccess: true
                                });
                            } else {
                                error.createfailed = 'Something wrong';
                                await mongoose.disconnect();
                                resolve({
                                    error: error,
                                    arrCategories: arr
                                })
                            }
                        });
                })
            }
        } catch (error) {
            await mongoose.disconnect();
            reject(error);
        }
    })
}

let checkCateName = (name) => {
    return new Promise(async (resolve, reject) => {
        try {
            let category = await Categories.findOne({ name: name })
                .then((category) => {
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

let checkCategoryById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const url = process.env.URL_DB;
            const connect = mongoose.connect(url, { family: 4 });
            connect.then(() => {
                Categories.findOne({ _id: id })
                    .then((category) => {
                        mongoose.disconnect().then(() => {
                            if (category) {
                                resolve(true);
                            }
                            resolve(false);
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                        resolve(false);
                    });
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const deleteCategoryById = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const error = {}
            let arrCategories = await getAllCategories();
            const isExist = await checkCategoryById(id);
            if (isExist) {
                const url = process.env.URL_DB;
                const connect = mongoose.connect(url, { family: 4 });
                connect.then(() => {
                    console.log('vo day roi');
                    Categories.deleteOne({ "_id": id })
                        .then(async (category) => {
                            console.log('delete: ', category);
                            arrCategories = await getAllCategories();
                            await mongoose.disconnect();
                            resolve(
                                {
                                    deleteSuccess: true,
                                    arrCategories: arrCategories
                                }
                            )
                            return category;
                        })
                        .catch(async (err) => {
                            console.log('error check: ', err);
                            error.dbError = 'Something wrong with DB';
                            await mongoose.disconnect();
                            reject(
                                {
                                    error: error,
                                    arrCategories: arrCategories
                                }
                            )
                        });
                })
            } else {
                error.missingId = 'Missing Id or wrong Id'
                reject(
                    {
                        error: error,
                        arrCategories: arrCategories
                    }
                )
            }
        } catch (error) {
            reject(error)
        }
    })
}
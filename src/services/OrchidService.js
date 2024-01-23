import mongoose from "mongoose";
import Orchids from '../models/Orchids'

export const getAllOrchids = async () => {
    const url = process.env.URL_DB;
    const connect = mongoose.connect(url, { family: 4 });
    let arrOrchids = [];

    arrOrchids = connect.then(() => {
        console.log('Connected correctly to server');
        return Orchids.find({})
            .then(async (orchids) => {
                await mongoose.disconnect();
                return orchids;
            })
            .catch((err) => {
                console.log(err);
                arrOrchids = [];
            });
    });

    return arrOrchids;
}

export const createOrchid = async (newOrchid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let error = {}
            let isError = false
            let arr = await getAllOrchids();
            if (newOrchid.orchidName === '' || newOrchid.orchidName === undefined) {
                error.isEmptyName = 'Name cannot be empty';
                isError = true;
            }
            if (newOrchid.image === '' || newOrchid.image === undefined) {
                error.isEmptyImg = 'Image cannot be empty';
                isError = true;
            }
            if (newOrchid.price === '' || newOrchid.price === undefined) {
                error.isEmptyPrice = 'Price cannot be empty';
                isError = true;
            }
            if (newOrchid.original === '' || newOrchid.original === undefined) {
                error.isEmptyOriginal = 'Original cannot be empty';
                isError = true;
            }
            if (newOrchid.isNatural === '' || newOrchid.isNatural === undefined) {
                error.isEmptyNatural = 'Natural cannot be empty';
                isError = true;
            }
            if (newOrchid.color === '' || newOrchid.color === undefined) {
                error.isEmptyColor = 'Color cannot be empty';
                isError = true;
            }
            if (isError) {
                resolve({
                    error: error,
                    arrOrchids: arr
                })
            }
            let isExist = await checkOrchidName(newOrchid.orchidName);
            if (isExist) {
                error.isDup = 'Name Duplicated';
                isError = true;
                resolve({
                    error: error,
                    arrOrchids: arr
                })
            }
            if (!isError) {
                const url = process.env.URL_DB;
                const connect = mongoose.connect(url, { family: 4 });
                connect.then(() => {
                    Orchids({ name: newOrchid.orchidName, image: newOrchid.image, price: newOrchid.price, original: newOrchid.original, isNatural: newOrchid.isNatural === 'true' ? true : false, color: newOrchid.color }).save()
                        .then(async (orc) => {
                            if (orc) {
                                arr = await getAllOrchids();
                                await mongoose.disconnect();
                                resolve({
                                    arrOrchids: arr,
                                    isSuccess: true
                                });
                            } else {
                                error.createfailed = 'Something wrong';
                                await mongoose.disconnect();
                                resolve({
                                    error: error,
                                    arrOrchids: arr
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

let checkOrchidName = (name) => {
    return new Promise(async (resolve, reject) => {
        try {
            const url = process.env.URL_DB;
            const connect = mongoose.connect(url, { family: 4 });
            connect.then(() => {
                Orchids.findOne({ name: name })
                    .then(async (orchid) => {
                        if (orchid) {
                            await mongoose.disconnect();
                            resolve(true);
                        } else {
                            await mongoose.disconnect();
                            resolve(false);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        resolve(false);
                    });
            })
        } catch (error) {
            console.log('Catch error: ', error);
            reject(false);
        }
    })
}

let checkOrchidById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const url = process.env.URL_DB;
            const connect = mongoose.connect(url, { family: 4 });
            connect.then(() => {
                Orchids.findOne({ _id: id })
                    .then((orchid) => {
                        mongoose.disconnect().then(() => {
                            if (orchid) {
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

export const updateOrc = async (orc) => {
    return new Promise(async (resolve, reject) => {
        try {
            let error = {}
            let isError = false
            let arr = await getAllOrchids();
            if (orc.name === '' || orc.name === undefined) {
                error.isEmptyName = 'Name cannot be empty';
                isError = true;
            }
            if (orc.image === '' || orc.image === undefined) {
                error.isEmptyImg = 'Image URL cannot be empty';
                isError = true;
            }
            if (orc.price === '' || orc.price === undefined) {
                error.isEmptyPrice = 'Price cannot be empty';
                isError = true;
            }
            if (orc.original === '' || orc.original === undefined) {
                error.isEmptyOriginal = 'Original cannot be empty';
                isError = true;
            }
            if (orc.isNatural === '' || orc.isNatural === undefined) {
                error.isEmptyNatural = 'Natural cannot be empty';
                isError = true;
            }
            if (orc.color === '' || orc.color === undefined) {
                error.isEmptyColor = 'Color cannot be empty';
                isError = true;
            }
            if (isError) {
                resolve({
                    errorUpdate: error,
                    arrOrchids: arr
                })
            }
            let isExist = await checkOrchidName(orc.name);
            if (isExist) {
                error.isDup = 'Name Duplicated';
                isError = true;
                resolve({
                    errorUpdate: error,
                    arrOrchids: arr
                })
            }
            if (!isError) {
                const url = process.env.URL_DB;
                const connect = mongoose.connect(url, { family: 4 });
                connect.then(() => {
                    Orchids.updateOne({ _id: orc.id }, { $set: { name: orc.name, image: orc.image, price: orc.price, original: orc.original, isNatural: orc.isNatural === 'true' ? true : false, color: orc.color } })
                        .then(async (isUpdated) => {
                            if (isUpdated.modifiedCount >= 1) {
                                arr = await getAllOrchids();
                                await mongoose.disconnect();
                                resolve({
                                    arrOrchids: arr,
                                    isUpdate: true
                                });
                            } else {
                                error.createfailed = 'Something wrong';
                                await mongoose.disconnect();
                                resolve({
                                    errorUpdate: error,
                                    arrOrchids: arr
                                })
                            }
                        });
                })
            }
        } catch (error) {
            console.log('Something wrong: ', error)
            reject(error);
        }
    })
}

export const deleteOrchidById = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const error = {}
            let arrOrchids = await getAllOrchids();
            const isExist = await checkOrchidById(id);
            if (isExist) {
                const url = process.env.URL_DB;
                const connect = mongoose.connect(url, { family: 4 });
                connect.then(() => {
                    console.log('vo day roi');
                    Orchids.deleteOne({ "_id": id })
                        .then(async (category) => {
                            console.log('delete: ', category);
                            arrOrchids = await getAllOrchids();
                            await mongoose.disconnect();
                            resolve(
                                {
                                    deleteSuccess: true,
                                    arrOrchids: arrOrchids
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
                                    arrOrchids: arrOrchids
                                }
                            )
                        });
                })
            } else {
                error.missingId = 'Missing Id or wrong Id'
                reject(
                    {
                        error: error,
                        arrOrchids: arrOrchids
                    }
                )
            }
        } catch (error) {
            reject(error)
        }
    })
}
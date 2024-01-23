import { createOrchid, getAllOrchids, updateOrc } from "../services/OrchidService"

export const OrchidsPage = async (req, res) => {
    let arrOrchids = await getAllOrchids();
    console.log('check: ', arrOrchids);
    return res.render('OrchidHomePage.ejs', { arrOrchids });
}

export const postOrchid = async (req, res) => {
    const data = await createOrchid(req.body);
    console.log('check data: ', data);
    if (data.error) {
        return res.status(200).render('OrchidHomePage.ejs', { arrOrchids: data.arrOrchids, error: data.error });
    }
    return res.status(200).render('OrchidHomePage.ejs', { arrOrchids: data.arrOrchids, isSuccess: data.isSuccess });
}

export const updateOrchid = async (req, res) => {
    console.log('check data: ', req.body);
    const data = await updateOrc(req.body);
    console.log('check: ', data);
    if (data.errorUpdate) {
        return res.status(200).json({ arrCategories: data.arrCategories, errorUpdate: data.errorUpdate });
    }
    return res.status(200).json({ arrCategories: data.arrCategories, isUpdate: data.isUpdate });
}

export const deleteOrchid = async (req, res) => {
    console.log('check data: ', req.params.id);
    const data = await deleteOrchidById(req.params.id);
    if (data.error) {
        return res.status(200).json({ arrCategories: data.arrCategories, error: data.error });
        // return res.status(200).render('OrchidPage.ejs', { arrCategories: data.arrCategories, error: data.error });
    }
    return res.status(200).json({ arrCategories: data.arrCategories, deleteSuccess: data.deleteSuccess });
    // return res.render('OrchidPage.ejs', { arrCategories: data.arrCategories, deleteSuccess: data.deleteSuccess });
}
import { createCategory, getAllCategories } from "../services/CategoryService";

export const getCategories = async (req, res) => {
    const arrCategories = await getAllCategories();
    return res.render('CategoryPage.ejs', { arrCategories });
}

export const postCategory = async (req, res) => {
    const data = await createCategory(req.body);
    console.log('check data: ', data);
    if (data.error) {
        return res.status(400).render('CategoryPage.ejs', { arrCategories: data.arrCategories, error: data.error });
    }
    // return res.send(arrCategories);
    return res.render('CategoryPage.ejs', { arrCategories: data.arrCategories, isSuccess: data.isSuccess });
}

export const deleteCategory = async (req, res) => {
    console.log('check data: ', req.params.id);
    // return res.send(arrCategories);
    return res.render('CategoryPage.ejs', { arrCategories: [] });
}
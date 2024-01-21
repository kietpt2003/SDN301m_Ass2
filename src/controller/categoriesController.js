import { createCategory, getAllCategories } from "../services/CategoryService";

export const getCategories = async (req, res) => {
    const arrCategories = await getAllCategories();
    return res.render('CategoryPage.ejs', { arrCategories });
}

export const postCategory = async (req, res) => {
    const arrCategories = await createCategory(req.body);
    // return res.send(arrCategories);
    return res.render('CategoryPage.ejs', { arrCategories });
}
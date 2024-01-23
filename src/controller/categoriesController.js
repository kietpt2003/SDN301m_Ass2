import { createCategory, deleteCategoryById, getAllCategories, updateCate } from "../services/CategoryService";

export const getCategories = async (req, res) => {
    const arrCategories = await getAllCategories();
    return res.status(200).render('CategoryPage.ejs', { arrCategories });
}

export const postCategory = async (req, res) => {
    const data = await createCategory(req.body);
    console.log('check data: ', data);
    if (data.error) {
        return res.status(200).render('CategoryPage.ejs', { arrCategories: data.arrCategories, error: data.error });
    }
    return res.status(200).render('CategoryPage.ejs', { arrCategories: data.arrCategories, isSuccess: data.isSuccess });
}

export const updateCategory = async (req, res) => {
    console.log('check data: ', req.body);
    const data = await updateCate(req.body);
    console.log('check: ', data);
    if (data.errorUpdate) {
        return res.status(200).json({ arrCategories: data.arrCategories, errorUpdate: data.errorUpdate });
    }
    return res.status(200).json({ arrCategories: data.arrCategories, isUpdate: data.isUpdate });
}

export const deleteCategory = async (req, res) => {
    console.log('check data: ', req.params.id);
    const data = await deleteCategoryById(req.params.id);
    if (data.error) {
        return res.status(200).json({ arrCategories: data.arrCategories, error: data.error });
        // return res.status(200).render('CategoryPage.ejs', { arrCategories: data.arrCategories, error: data.error });
    }
    return res.status(200).json({ arrCategories: data.arrCategories, deleteSuccess: data.deleteSuccess });
    // return res.render('CategoryPage.ejs', { arrCategories: data.arrCategories, deleteSuccess: data.deleteSuccess });
}
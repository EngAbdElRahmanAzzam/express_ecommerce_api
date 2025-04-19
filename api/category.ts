import { Router } from "express";
import { createCategory, getCategories, getCategory, updateCategory , deleteCategory} from "../services/category";
import { createCategoryValidator, getCategoryValidator ,updateCategoryValidator , deleteCategoryValidator } from "../validators/category";
import { subcategoryRouter } from "./subcategory";

export const categoryRouter = Router()

categoryRouter.use('/:categoryId/subcategory', subcategoryRouter)

categoryRouter.route('/')
    .post(createCategoryValidator,createCategory)
    .get(getCategories)


categoryRouter.route('/:id')
    .get(getCategoryValidator, getCategory)
    .put(updateCategoryValidator,updateCategory)
    .delete(deleteCategoryValidator,deleteCategory)



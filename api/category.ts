import { Router } from "express";
import { createCategory, getCategories, getCategory, updateCategory , deleteCategory} from "../services/category";


export const categoryRouter = Router()

categoryRouter.route('/').post(createCategory).get(getCategories)
categoryRouter.route('/:id').get(getCategory).put(updateCategory).delete(deleteCategory)
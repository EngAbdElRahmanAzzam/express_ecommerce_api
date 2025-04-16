import {Router } from "express";
import {createSubcategory, getSubcategories , getSubcategory , updateSubcategory , deleteSubcategory } from "../services/subcategory";

export const subcategoryRouter = Router()

subcategoryRouter.route('/').post(createSubcategory).get(getSubcategories)
subcategoryRouter.route('/:id').get(getSubcategory).put(updateSubcategory).delete(deleteSubcategory)
import {Router } from "express";
import {setCategoryIdSubcategory ,createSubcategory, getSubcategories , getSubcategory , updateSubcategory , deleteSubcategory , deleteSubcategoryByCategory} from "../services/subcategory";
import { createSubcategoryValidator, categoryIdRequredValidator, categoryIdOptionalValidator ,getSubcategoryValidator , updateSubcategoryValidator, deleteSubcategoryValidator } from "../validators/subcategory";


export const subcategoryRouter = Router({mergeParams:true})

subcategoryRouter.route('/')
    .post(setCategoryIdSubcategory,createSubcategoryValidator,createSubcategory)
    .get(categoryIdOptionalValidator,getSubcategories)
    .delete(categoryIdRequredValidator,deleteSubcategoryByCategory)

subcategoryRouter.route('/:id')
    .get(getSubcategoryValidator,getSubcategory)
    .put(updateSubcategoryValidator,updateSubcategory)
    .delete(deleteSubcategoryValidator,deleteSubcategory)

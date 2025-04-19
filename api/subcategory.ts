import {Router } from "express";
import {createSubcategory, getSubcategories , getSubcategory , updateSubcategory , deleteSubcategory } from "../services/subcategory";
import { createSubcategoryValidator, getSubcategoryValidator , updateSubcategoryValidator, deleteSubcategoryValidator } from "../validators/subcategory";


export const subcategoryRouter = Router({mergeParams:true})

subcategoryRouter.route('/')
    .post(createSubcategoryValidator,createSubcategory)
    .get(getSubcategories)

subcategoryRouter.route('/:id')
    .get(getSubcategoryValidator,getSubcategory)
    .put(updateSubcategoryValidator,updateSubcategory)
    .delete(deleteSubcategoryValidator,deleteSubcategory)

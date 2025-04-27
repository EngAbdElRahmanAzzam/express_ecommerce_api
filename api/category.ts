import express, { Request, Response, Router } from 'express';
import { createCategory, getCategories, getCategory, updateCategory , deleteCategory} from "../services/category";
import { createCategoryValidator, getCategoryValidator ,updateCategoryValidator , deleteCategoryValidator } from "../validators/category";
import { subcategoryRouter } from "./subcategory";
import multer from "multer"

const uploadMedia = multer({dest:"uploads/category"})

export const categoryRouter = Router()

categoryRouter.use('/:categoryId/subcategory', subcategoryRouter)

categoryRouter.route('/')
    .post(uploadMedia.single('photo'), createCategoryValidator,(req:Request, res:Response)=>{
        console.log(req.file)
    },createCategory)
    .get(getCategories)

categoryRouter.route('/:id')
    .get(getCategoryValidator, getCategory)
    .put(updateCategoryValidator,updateCategory)
    .delete(deleteCategoryValidator,deleteCategory)



import { Router } from "express";
import {createBrand , getBrands , getBrand, updateBrand, deleteBrand} from "../services/brand";
import { createCategoryValidator, getCategoryValidator ,updateCategoryValidator , deleteCategoryValidator } from "../validators/category";

export const brandRouter = Router()

brandRouter.route('/')
    .post(createCategoryValidator,createBrand)
    .get(getBrands)


brandRouter.route('/:id')
    .get(getCategoryValidator, getBrand)
    .put(updateCategoryValidator,updateBrand)
    .delete(deleteCategoryValidator,deleteBrand)
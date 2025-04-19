import { Router } from "express";
import {createBrand , getBrands , getBrand, updateBrand, deleteBrand} from "../services/brand";
import {createBrandValidator, getBrandValidator , updateBrandValidator, deleteBrandValidator } from "../validators/brand";

export const brandRouter = Router()

brandRouter.route('/')
    .post(createBrandValidator,createBrand)
    .get(getBrands)


brandRouter.route('/:id')
    .get(getBrandValidator, getBrand)
    .put(updateBrandValidator,updateBrand)
    .delete(deleteBrandValidator,deleteBrand)
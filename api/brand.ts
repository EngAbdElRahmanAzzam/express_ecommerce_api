import { Router } from "express";
import {createBrand , getBrands , getBrand, updateBrand, deleteBrand} from "../services/brand";
import {createBrandValidator, getBrandValidator , updateBrandValidator, deleteBrandValidator } from "../validators/brand";
import { protectedRoute } from "../services/auth";

export const brandRouter = Router()

brandRouter.route('/')
    .post(protectedRoute,createBrandValidator,createBrand)
    .get(protectedRoute,getBrands)


brandRouter.route('/:id')
    .get(getBrandValidator, getBrand)
    .put(updateBrandValidator,updateBrand)
    .delete(deleteBrandValidator,deleteBrand)
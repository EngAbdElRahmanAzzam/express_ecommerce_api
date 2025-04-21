import { Router } from "express";
import {createProduct, getProducts, getProduct ,  updateProduct , deleteProduct} from "../services/product";
import { createProductValidator , getProductsValidator , getProductValidator , updateProductValidator, deleteProductValidator} from "../validators/product";
import { subcategoryRouter } from "./subcategory";

export const productRouter = Router()

productRouter.route('/')
    .post(createProductValidator,createProduct)
    .get(getProductsValidator,getProducts)


productRouter.route('/:id')
    .get(getProductValidator, getProduct)
    .put(updateProductValidator,updateProduct)
    .delete(deleteProductValidator,deleteProduct)


import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import slugify  from "slugify" 

import { ProductModel } from "../models/product";
import { responseHandle } from "../utils/apiResponse";
import { factory } from "./handlerFactory";
import {IProduct} from "../interfaces/product"


/**
 * @access private
 * @breif create new product
 * @url POST api/v1/product
 * @param  title - Description of the category name.
 * @returns product
 */

export const createProduct = asyncHandler(
    async (req:Request, res:Response) => {
        const {title} = req.body
        req.body.slug = slugify(title)

        const product = await ProductModel.create(req.body);
        res.status(201).json(responseHandle(product))
    }
)

/**
 * @access public
 * @breif get all products
 * @url GET api/v1/product
 * @returns [] -> products , lenght
 */

export const getProducts = async (req:Request, res:Response) => {
    const page = +(req.query.p  ?? 1)
    const limit = +(req.query.l ?? 10)

    const skip = (page-1) * limit

    const products = await ProductModel.find().skip(skip).limit(limit)

    const data = {
        length : products.length,
        products:products
    }

    res.json(responseHandle(data))
}

/**
 * @access public
 * @breif get certin product
 * @url GET api/v1/product/:id
 * @returns product | not found
 */

export const getProduct = asyncHandler(
    async (req:Request, res:Response) => {
        const {id} = req.params

        const product = await ProductModel.findById(id)

        if(product)
            res.status(200).json(responseHandle(product))
        else
            res.status(404).json(responseHandle("product Not Found", true))
    }
)

/**
 * @access private
 * @breif update certin product
 * @url PUT api/v1/product/:id
 * @param  title - Description of the new product name.
 * @returns category
 */

export const updateProduct = asyncHandler( 
    async (req:Request, res:Response) => {
        const {id} = req.params
        const {title} = req.body
        req.body.slug =  slugify(title)

        const product = await ProductModel.findByIdAndUpdate(id, req.body,{new:true})
        res.status(201).json(responseHandle(product))
    }
)

/**
 * @access private
 * @breif delete certin category
 * @url DELETE api/v1/category/:id
 * @returns category | not found
 */

export const deleteProduct = factory.deleteDocument<IProduct>(ProductModel)
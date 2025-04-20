import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import slugify  from "slugify" 
import { BrandModel } from "../models/brand";
import { responseHandle } from "../utils/apiResponse";
import { deleteDocument, getDocument } from "./handlerFactory";
import { IBrand } from "../interfaces/brand";

/**
 * @access private
 * @breif create new Brand
 * @url POST api/v1/brand
 * @param  title - Description of the brand name.
 * @param  photo - Description of the brand image.
 * @returns new brand
 */

export const createBrand = asyncHandler(
    async (req:Request, res:Response) => {
        const {title} = req.body
        const slug = slugify(title)

        const brand = await BrandModel.create({name:title,slug});
        res.status(201).json(responseHandle(brand))
    }
)

/**
 * @access public
 * @breif get all brands
 * @url GET api/v1/brand
 * @returns [] -> brand , lenght
 */

export const getBrands = async (req:Request, res:Response) => {

    const brands = await BrandModel.find()

    const data = {
        length : brands.length,
        categories:brands
    }
    res.json(responseHandle(data))
}

/**
 * @access public
 * @breif get certin brand
 * @url GET api/v1/brand/:id
 * @returns brand | not found
 */
export const getBrand = getDocument<IBrand>(BrandModel)

/**
 * @access private
 * @breif update certin brand
 * @url PUT api/v1/brand/:id
 * @param  title - Description of the new brand name.
 * @param  photo - Description of the new brand image.
 * @returns updated brand
 */

export const updateBrand = asyncHandler( 
    async (req:Request, res:Response) => {
        const brandId = req.params.id
        const {title} = req.body
        const slug = slugify(title)

        const brand = await BrandModel.findByIdAndUpdate(brandId, {name:title , slug},{new:true})
        res.status(201).json(responseHandle(brand))
    }
)

/**
 * @access private
 * @breif delete certin brand
 * @url DELETE api/v1/brand/:id
 * @returns brand | not found
 */
export const deleteBrand = deleteDocument<IBrand>(BrandModel)
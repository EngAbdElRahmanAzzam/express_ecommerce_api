import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import slugify  from "slugify" 

import { categoryModel } from "../models/category";
import { responseHandle } from "../utils/apiResponse";

/**
 * @access private
 * @breif create new category
 * @url POST api/v1/category
 * @param  title - Description of the category name.
 * @returns category
 */

export const createCategory = asyncHandler(
    async (req:Request, res:Response) => {
        const catergoryName = req.body.title
        const slug = slugify(catergoryName)

        const category =await categoryModel.create({name:catergoryName,slug});
        res.status(201).json(responseHandle(category))
    }
)

/**
 * @access public
 * @breif get all categories
 * @url GET api/v1/category
 * @returns categories , lenght
 */

export const getCategories = async (req:Request, res:Response) => {
    const page = +(req.query.p  ?? 1)
    const limit = +(req.query.l ?? 10)
    const skip = (page-1) * limit
    const categories = await categoryModel.find().skip(skip).limit(limit)
    const data = {
        length : categories.length,
        categories:categories
    }
    res.json(responseHandle(data))
}

/**
 * @access public
 * @breif get certin category
 * @url GET api/v1/category/:id
 * @returns category | not found
 */

export const getCategory = asyncHandler(
    async (req:Request, res:Response) => {
        const categoryId = req.params.id

        const category = await categoryModel.findById(categoryId)

        if(category)
            res.status(200).json(responseHandle(category))
        else
            res.status(404).json(responseHandle("category Not Found", true))
    }
)

/**
 * @access private
 * @breif update certin category
 * @url PUT api/v1/category/:id
 * @param  title - Description of the new category name.
 * @returns category
 */

export const updateCategory = asyncHandler( 
    async (req:Request, res:Response) => {
        const categoryId = req.params.id
        const newCategoryName = req.body.category
        const newCategorySlug = slugify(newCategoryName)

        const category = await categoryModel.findOneAndUpdate({_id:categoryId}, {name:newCategoryName , slug:newCategorySlug},{new:true})
        res.status(201).json(responseHandle(category))
    }
)

/**
 * @access private
 * @breif delete certin category
 * @url DELETE api/v1/category/:id
 * @returns category | not found
 */

export const deleteCategory = asyncHandler( 
    async (req:Request, res:Response) => {
        const categoryId = req.params.id

        const category = await categoryModel.findOneAndDelete({_id:categoryId})

        if(category)
            res.status(201).json(responseHandle(category))
        else
            res.status(404).json(responseHandle("Not Found", true))
    }
)
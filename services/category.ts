import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import slugify  from "slugify" 
import { CategoryModel } from "../models/category";
import { responseHandle } from "../utils/apiResponse";
import { factory } from "./handlerFactory";
import {ICategory} from "../interfaces/category"

/**
 * @access private
 * @breif create new category
 * @url POST api/v1/category
 * @param  title - Description of the category name.
 * @returns category
 */

export const createCategory = asyncHandler(
    async (req:Request, res:Response) => {
        const {title} = req.body
        const slug = slugify(title)

        const category =await CategoryModel.create(req.body);
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
    const categories = await CategoryModel.find()
    
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

        const category = await CategoryModel.findById(categoryId)

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
        const {title} = req.body
        const slug = slugify(title)

        const category = await CategoryModel.findOneAndUpdate({_id:categoryId}, {name:title , slug},{new:true})
        res.status(201).json(responseHandle(category))
    }
)

/**
 * @access private
 * @breif delete certin category
 * @url DELETE api/v1/category/:id
 * @returns category | not found
 */

export const deleteCategory = factory.deleteDocument<ICategory>(CategoryModel)
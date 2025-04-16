import { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import { subcategoryModel } from "../models/subcategory"
import slugify from "slugify"
import { responseHandle } from "../utils/apiResponse"

/**
 * @access private
 * @breif create new subcategory
 * @url POST api/v1/subcategory
 * @param  title - Description of the category name.
 * @param  categoryId - Description of the category Id.
 * @returns new category
 */
export const createSubcategory = asyncHandler(
    async (req:Request, res:Response) => {
        const {title , categoryId} = req.body
        const slug = slugify(title)

        const subcategory = await subcategoryModel.create({name:title, slug, category:categoryId})
        res.status(201).json(responseHandle(subcategory))
    }
)


/**
 * @access private
 * @breif create new category
 * @url POST api/v1/category
 * @param  title - Description of the category name.
 * @returns category
 */
export const getSubcategories = () => {
    
}


/**
 * @access private
 * @breif create new category
 * @url POST api/v1/category
 * @param  title - Description of the category name.
 * @returns category
 */
export const getSubcategory = () => {
    
}


/**
 * @access private
 * @breif create new category
 * @url POST api/v1/category
 * @param  title - Description of the category name.
 * @returns category
 */
export const updateSubcategory = () => {
    
}


/**
 * @access private
 * @breif create new category
 * @url POST api/v1/category
 * @param  title - Description of the category name.
 * @returns category
 */
export const deleteSubcategory = () => {
    
}
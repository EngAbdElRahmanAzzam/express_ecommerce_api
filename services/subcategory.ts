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
 * @access public
 * @breif get all subcategories
 * @url GET api/v1/subcategory
 * @returns [] -> categories ,lenght
 */
export const getSubcategories = asyncHandler(
    async (req:Request, res:Response) => {
        const subcategories = await subcategoryModel.find()
        const data = {
            lenght:subcategories.length,
            subcategories:subcategories
        }

        res.status(200).json(responseHandle(data))
    }
)


/**
 * @access public
 * @breif get certin subcategory
 * @url GET api/v1/subcategory/:id
 * @returns category
 */
export const getSubcategory = asyncHandler(
    async (req:Request, res:Response) => {
        const subcategoryId = req.params.id

        const subcategory = await subcategoryModel.findById(subcategoryId).populate({path:"category", select:"name image -_id"})
        if(subcategory)
            res.status(200).json(responseHandle(subcategory))
        else
            res.status(404).json(responseHandle("not found subcategory", true))
    }
)


/**
 * @access private
 * @breif update category
 * @url PUT api/v1/category/:id
 * @param  title - Description of the category name.
 * @param  categoryId - Description of the category name.
 * @returns category
 */
export const updateSubcategory = asyncHandler(
    async (req:Request, res:Response) => {
        const subcategoryId = req.params.id
        const { title ,categoryId } = req.body
        const slug = slugify(title)

        const subcategory = await subcategoryModel.findByIdAndUpdate(subcategoryId, {name:title,slug,category:categoryId}, {new:true})
        
        if(subcategory)
            res.status(201).json(responseHandle(subcategory))
        else
            res.status(404).json(responseHandle("not found subcategory", true))
    }
)


/**
 * @access private
 * @breif deelte certin category
 * @url DELETE api/v1/category/:id
 * @returns category
 */
export const deleteSubcategory = asyncHandler(
    async (req:Request, res:Response) => {
        const subcategoryId = req.params.id

        const subcategory = await subcategoryModel.findByIdAndDelete(subcategoryId)

        if(subcategory)
            res.status(201).json(responseHandle(subcategory))
        else
            res.status(404).json(responseHandle("not found subcategory", true))
    }
)
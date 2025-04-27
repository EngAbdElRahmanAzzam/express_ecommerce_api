import {  body , param} from "express-validator";
import { msgErrors } from "../utils/msgErrors";
import { catchErrorValidator } from "../middlewares/validator";
import { idMongoValidator } from ".";


const bodysubCategoryValidator = [
    body('title')
        .notEmpty().withMessage('Category required')
        .isLength({ min: 3 }).withMessage('Too short category name')
        .isLength({ max: 32 }).withMessage('Too long category name'),

    body('categoryId')
        .notEmpty().withMessage('Category required')
        .isMongoId().withMessage(msgErrors.id)
]

export const categoryIdOptionalValidator = [
    param('categoryId')
        .optional()
        .isMongoId()
        .withMessage(msgErrors.id),

    catchErrorValidator
]

export const categoryIdRequredValidator = [
    param('categoryId')
        .isMongoId()
        .withMessage(msgErrors.id),
        
    catchErrorValidator
]

export const createSubcategoryValidator = [
    ...bodysubCategoryValidator,
    catchErrorValidator
]

export const getSubcategoryValidator = [
    ...idMongoValidator,
    catchErrorValidator
]

export const updateSubcategoryValidator = [
    ...idMongoValidator,
    ...bodysubCategoryValidator,
    catchErrorValidator
]


export const deleteSubcategoryValidator = [
    ...idMongoValidator,
    catchErrorValidator
]
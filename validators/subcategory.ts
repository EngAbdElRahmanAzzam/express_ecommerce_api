import {  body} from "express-validator";
import { msgErrors } from "../utils/msgErrors";
import { catchErrorValidator } from "../middlewares/validator";
import { idMongoValidator } from ".";

const idsubCategoryValidator = idMongoValidator

const bodysubCategoryValidator = [
    body('title')
    .notEmpty().withMessage('Category required')
    .isLength({ min: 3 }).withMessage('Too short category name')
    .isLength({ max: 32 }).withMessage('Too long category name'),

    body('categoryId')
    .notEmpty().withMessage('Category required')
    .isMongoId().withMessage(msgErrors.id)
]

export const createCategoryValidator = [
    ...bodysubCategoryValidator,
    catchErrorValidator
]

export const getCategoryValidator = [
    ...idsubCategoryValidator,
    catchErrorValidator
]

export const updateCategoryValidator = [
    ...idsubCategoryValidator,
    ...bodysubCategoryValidator,
    catchErrorValidator
]


export const deleteCategoryValidator = [
    ...idsubCategoryValidator,
    catchErrorValidator
]
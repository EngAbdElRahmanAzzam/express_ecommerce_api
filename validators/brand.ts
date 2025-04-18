import {body} from "express-validator"
import { catchErrorValidator } from "../middlewares/validator"
import { idMongoValidator } from "."

export const bodyBrandValidator = [
    body('title')
        .notEmpty().withMessage('Brand required')
        .isLength({ min: 3 }).withMessage('Too short Brand name')
        .isLength({ max: 32 }).withMessage('Too long Brand name'),

    body('photo')
        .optional()
        .matches(/\.(jpg|jpeg|png|gif|webp)$/i).withMessage("image must be an image extention(.jpg, .png, etc)"),
]

export const createBrandValidator = [
    ...bodyBrandValidator,
    catchErrorValidator
]

export const getBrandValidator = [
    ...idMongoValidator,
    catchErrorValidator
]

export const updateBrandValidator = [
    ...idMongoValidator,
    ...bodyBrandValidator,
    catchErrorValidator
]


export const deleteBrandValidator = [
    ...idMongoValidator,
    catchErrorValidator
]
import { query } from "express-validator";
import { idMongoValidator } from ".";
import { catchErrorValidator } from "../middlewares/validator";

export const bodyProductValidator = [

]

export const createProductValidator = [
    ...bodyProductValidator,
    catchErrorValidator
]

export const getProductsValidator = [
    query('l')
        .optional()
        .isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100')
        .toInt(),

    query('p')
        .optional()
        .isInt({ min: 1 }).withMessage('Page must be an integer greater than 0')
        .toInt(),
        
    catchErrorValidator
]

export const getProductValidator = [
    ...idMongoValidator,
    catchErrorValidator
]

export const updateProductValidator = [
    ...idMongoValidator,
    ...bodyProductValidator,
    catchErrorValidator
]

export const deleteProductValidator = [
    ...idMongoValidator,
    catchErrorValidator
]
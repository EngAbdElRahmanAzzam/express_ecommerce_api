import { param , body} from "express-validator";
import { msgErrors } from "../utils/msgErrors";
import { catchErrorValidator } from "../middlewares/validator";

const idCategoryValidator = [
    param('id').isMongoId().withMessage(msgErrors.id),
]

const bodyCategoryValidator = [
    body('title')
    .notEmpty().withMessage('Category required')
    .isLength({ min: 3 }).withMessage('Too short category name')
    .isLength({ max: 32 }).withMessage('Too long category name'),

    body('photo')
    .optional()
    .matches(/\.(jpg|jpeg|png|gif|webp)$/i).withMessage("image must be an image extention(.jpg, .png, etc)"),
]

export const createCategoryValidator = [
    ...bodyCategoryValidator,
    catchErrorValidator
]

export const getCategoryValidator = [
    ...idCategoryValidator,
    catchErrorValidator
]

export const updateCategoryValidator = [
    ...idCategoryValidator,
    ...bodyCategoryValidator,
    catchErrorValidator
]


export const deleteCategoryValidator = [
    ...idCategoryValidator,
    catchErrorValidator
]
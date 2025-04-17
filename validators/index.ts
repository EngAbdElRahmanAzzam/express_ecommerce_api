import { param} from "express-validator";
import { msgErrors } from "../utils/msgErrors";

export const idMongoValidator = [
    param('id').isMongoId().withMessage(msgErrors.id),
]
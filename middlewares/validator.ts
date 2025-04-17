import { NextFunction, Request, Response } from "express";
import {validationResult , ValidationError } from "express-validator"
import { statusCode } from "../utils/msgErrors";

export const catchErrorValidator = (req:Request, res:Response, next:NextFunction) => {
    const errors = validationResult(req)

    if(errors.isEmpty())
        return next()

    const formattedErrors: Record<string, string> = {};
    res.status(400).json(errors);
}   
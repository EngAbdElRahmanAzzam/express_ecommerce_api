import asyncHandler from "express-async-handler";
import { Model } from "mongoose";
import { responseHandle } from "../utils/apiResponse";
import { NextFunction, Request, Response } from "express";


export const factory ={
    getDocument:<modelType> (Model:Model<any>) =>  asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            const {id} = req.params
    
            const document:modelType | null = await Model.findById(id)
    
            if(document)
                res.status(200).json(responseHandle(document))
            else
                res.status(404).json(responseHandle("Not Found document with this id", true))
        }
    ),

    deleteDocument:  <modelType> (Model:Model<any>) => asyncHandler(

        async (req: Request, res: Response, next: NextFunction) => {
            const {id} = req.params
    
            const document:modelType | null = await Model.findByIdAndDelete(id)
    
            if(document)
                res.status(201).json(responseHandle(document))
            else
                res.status(404).json(responseHandle("Not Found row with this id", true))
        }
    
    ) 
}


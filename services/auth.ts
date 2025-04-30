import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import jwt from 'jsonwebtoken';
import { responseHandle } from "../utils/apiResponse";
import slugify from "slugify";
import { UserModel } from "../models/user";
import { JWT_EXPIRE, JWT_KEY } from "../config";
import { createToken } from "../utils/jwtToken";


export const signUp = asyncHandler(
    async (req:Request, res:Response) => {
        const allowedKeys = new Set(["name", "email", "password", "phone", "profileImg"])
        let filterdRow:Record<string, unknown> = {} 
 
        for(const key in req.body)
        {
            if(allowedKeys.has(key))
                filterdRow["user$"+key] = req.body[key]
            else
                res.status(400).json(responseHandle("Bad request unkoumn keys", true))
        }

        filterdRow["user$slug"] = slugify(req.body.name)

        const user = await UserModel.create(filterdRow);

        const token = createToken({userId :user._id})
        if(user)
        {
            res.status(201).json(responseHandle({jwt:token, user}))
        }
    }
)
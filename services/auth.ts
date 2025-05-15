import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import jwt from 'jsonwebtoken';
import { responseHandle } from "../utils/apiResponse";
import slugify from "slugify";
import { UserModel } from "../models/user";
import { JWT_EXPIRE, JWT_KEY } from "../config";
import { createToken } from "../utils/jwtToken";
import { compare } from "bcryptjs";
import {TRoles} from "../interfaces/user"


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
            const response = {
                username: user.user$name,
                email:user.user$email,
            }

            res.status(201).json(responseHandle({jwt:token, user:response}))
        }
    }
)


export const login = asyncHandler(
    async (req:Request, res:Response) => {
        const {email , password} = req.body

        const user = await UserModel.findOne({user$email:email})
        console.log(password)
        if(!user || !await compare(password, user.user$password as string)){
            res.status(403).json(responseHandle("Invalid email or password", true))
            return
        }

        const token = createToken({userId :user._id})
        const response = {
            username: user.user$name,
            email:user.user$email,
        }

        res.status(200).json(responseHandle({jwt:token, user:response}))
    }
)

export const protectedRoute =asyncHandler(
    async (req:Request, res:Response, next:NextFunction) => {
        const { authorization  } = req.headers

        //check token
        if(!authorization)
        {
            res.status(403).json(responseHandle("please login" , true))
            return
        }

        //validation token and decode data
        const decodedToken: any  = jwt.verify(authorization as string, JWT_KEY);
        
        // check user exist
        const user = await UserModel.findById(decodedToken.userId)
        if(!user)
        {
            res.status(403).json(responseHandle("please login" , true))
            return
        }

        // 4) Check if user change his password after token created
        if(user.user$passwordUpdateAt)
        {
            const changeTime: number = parseInt((user.user$passwordUpdateAt.getTime() / 1000).toString())
            if (changeTime > decodedToken.iat){
                res.status(403).json(responseHandle("please login" , true))
                return;
            }
        }

        // active
        if(!user.user$active){
            res.status(403).json(responseHandle("blocked account" , true))
            return;
        }
        
        req.user = user
        next()
    }
) 


export const allowedTo = (roles:TRoles)=> asyncHandler(
        async (req:Request, res:Response, next:NextFunction) => {
            if(!roles.includes(req.user?.user$role!))
            {
                res.status(403).json(responseHandle("forbidden unautherized" , true))
                return;
            }
            next()
        }
    )

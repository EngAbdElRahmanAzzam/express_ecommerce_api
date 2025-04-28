import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import slugify  from "slugify" 
import { UserModel } from "../models/user";
import { responseHandle } from "../utils/apiResponse";
import { factory } from "./handlerFactory";
import { IUser } from "../interfaces/user";

/**
 * @access private
 * @breif create new user
 * @url POST api/v1/user
 * @returns new user
 */
export const createUser = asyncHandler(
    async (req:Request, res:Response) => {
        const allowedKeys = new Set(["name", "email", "password", "phone", "role", "profileImg" , "slug" , "active"])
        const filterdRow:Record<string, unknown> = {} 

        for(const key in req.body)
        {
            if(allowedKeys.has(key))
                filterdRow["user$"+key] = req.body[key]
        }
        filterdRow["user$slug"] = slugify(req.body.name)

        const user = await UserModel.create(filterdRow);
        res.status(201).json(responseHandle(user))
    }
)

/**
 * @access private
 * @breif get all users
 * @url GET api/v1/user
 * @returns [] -> user , lenght
 */
export const getUsers = async (req:Request, res:Response) => {
    const limit = +(req.query.l ?? 10)
    const page = +(req.query.p ?? 1)
    const skip = (+page - 1) * limit 

    const users = await UserModel.find().skip(skip).limit(limit)

    const data = {
        length : users.length,
        categories:users
    }
    res.json(responseHandle(data))
}

/**
 * @access private
 * @breif get certin user
 * @url GET api/v1/user/:id
 * @returns user | not found
 */
export const getUser = factory.getDocument<IUser>(UserModel)

/**
 * @access private
 * @breif update certin user
 * @url PUT api/v1/user/:id
 * @returns updated user
 */
export const updateUser = asyncHandler( 
    async (req:Request, res:Response) => {
        const brandId = req.params.id

        const allowedKeys = new Set(["name", "email", "password", "phone", "role", "profileImg" , "slug" , "active"])
        const filterdRow:Record<string, unknown> = {} 

        for(const key in req.body)
        {
            if(allowedKeys.has(key))
                filterdRow["user$"+key] = req.body[key]
        }
        filterdRow["user$slug"] = slugify(req.body.name)


        const user = await UserModel.findByIdAndUpdate(brandId, filterdRow,{new:true})
        res.status(201).json(responseHandle(user))
    }
)

/**
 * @access private
 * @breif delete certin user permantly
 * @url DELETE api/v1/user/:id
 * @returns user | not found
 */
export const deleteUser = factory.deleteDocument<IUser>(UserModel)

/**
 * @access private
 * @breif block certin user 
 * @url DELETE api/v1/user/:id/block
 * @returns user | not found
 */
export const blockUser =  asyncHandler(
    async (req:Request, res:Response) => {
        const {id} = req.params

        const updatedUser = await UserModel.findByIdAndUpdate(id, {active:false}, {new:true})

        if(updatedUser)
            res.status(201).json(responseHandle("sucess blocked user", true))
        else
            res.status(404).json(responseHandle("not found user", true))
    }
)


/**
 * @access private
 * @breif return certin user active
 * @url DELETE api/v1/user/:id/active
 * @returns user | not found
 */
export const re_activeUser =  asyncHandler(
    async (req:Request, res:Response) => {
        const {id} = req.params

        const updatedUser = await UserModel.findByIdAndUpdate(id, {active:true}, {new:true})

        if(updatedUser)
            res.status(201).json(responseHandle("sucess re-active user", true))
        else
            res.status(404).json(responseHandle("not found user", true))
    }
)
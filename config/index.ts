import dotenv from "dotenv"
import { TRoles } from "../interfaces/user"

dotenv.config()
export const APP_PORT = process.env.APP_PORT
export const APP_HOST = process.env.APP_HOST
export const DB_HOST = process.env.DB_HOST
export const JWT_KEY = process.env.JWT_KEY!
export const JWT_EXPIRE = process.env.JWT_EXPIRE!


export const collections = {
    category:"",
    subcategory:"",
    brand:"Brand",
    product:"",
    user:""
}


export const ROLES:TRoles = ["user", "manager", "admin"] 

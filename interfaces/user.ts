import { Document } from "mongoose";


export type TRole = "user"|"manager"|"admin"
export type TRoles = TRole[]
export interface IUser extends Document {
    user$name:string,
    user$slug:string,
    user$profileImg?:string,
    user$email:string,
    user$password:string,
    user$passwordUpdateAt:Date,
    user$phone:string,
    user$role?:TRole,
    user$active?:boolean
}
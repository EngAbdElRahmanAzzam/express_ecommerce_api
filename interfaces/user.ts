import { Document } from "mongoose";

export interface IBrand extends Document {
    username:string,
    slug:string,
    profileImg?:string,
    useremail:string,
    userpassword:string,
    userphone:string,
    userrole?:string,
    active?:boolean
}
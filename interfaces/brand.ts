import { Document } from "mongoose";

export interface IBrand extends Document {
    name:string,
    slug:string,
    image?:string
}
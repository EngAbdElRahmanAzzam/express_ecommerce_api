import { Document } from "mongoose";

export interface ICategory extends Document {
    name:string,
    slug:string,
    image?:string
}
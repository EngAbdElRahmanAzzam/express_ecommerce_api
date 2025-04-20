import { Document } from "mongoose";
import { ICategory } from "./category";

export interface ISubcategory extends Document {
    name:string,
    slug:string,
    category:ICategory
}
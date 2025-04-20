import { Document } from "mongoose";
import { ICategory } from "./category";
import { ISubcategory } from "./subcategory";
import { IBrand } from "./brand";

export interface IProduct extends Document {
    name:string,
    slug:string,
    decription:string,
    price:number,
    priceAfterDiscound?:number,
    colors:string[],
    thumbnail:string,
    images:string[],
    quantity:number,
    numOfSold:number,
    ratingsAverage:number,
    ratingsQuantity:number,
    category:ICategory,
    subcategory:ISubcategory,
    brand:IBrand
}
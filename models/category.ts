import  { Schema, model } from "mongoose";

const categorySchema = new Schema(
    {
        name:{
            type:String,
            trim:true,
            required:[true, "category name is required"],
            unique:[true, "name is already exists"],
            minlength: [3, "Too short category name"],
            maxlength: [32, "Too long category name"],
        },

        slug:{
            type:String,
        },

        image: String,
    },
    {
        timestamps:true
    }    
)

export const CategoryModel = model('Category', categorySchema)
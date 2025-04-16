import  { Schema, model } from "mongoose";

const categorySchema = new Schema(
    {
        name:{
            type:String,
            trim:true,
            require:[true, "category name is required"],
            unique:[true, "this is already exists"],
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

export const categoryModel = model('Category', categorySchema)
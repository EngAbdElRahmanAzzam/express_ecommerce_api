import { Schema, model } from "mongoose";


const subcategorySchema = new Schema(
    {
        name : {
            type:String,
            trim:true,
            required:[true, "subcategory name is required"],
            unique:[true, "This name already exsits"],
            minlength: [3, "Too short subcategory name"],
            maxlength: [32, "Too long subcategory name"],
        },

        slug:{
            type:String
        },

        category:{
            type:Schema.ObjectId,
            ref:"Category",
            required:[true, "category parent is required"]
        }
    }
    ,
    {
        timestamps:true
    }
)


export const subcategoryModel = model("Subcategory", subcategorySchema)
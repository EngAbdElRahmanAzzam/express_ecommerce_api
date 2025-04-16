import { Schema, model } from "mongoose";


const subcategorySchema = new Schema(
    {
        name : {
            require:[true, "subcategory name is required"],
            unique:[true, "This name already exsits"],
            trim:true,
            minlength: [3, "Too short subcategory name"],
            maxlength: [32, "Too long subcategory name"],
        },

        slug:{
            type:String
        },

        category:{
            type:Schema.ObjectId,
            ref:"Category",
            require:[true, "category parent is required"]
        }
    }
    ,
    {
        timestamps:true
    }
)


export const subcategoryModel = model("Subcategory", subcategorySchema)
import { Schema, model , ValidatorProps  } from "mongoose";
import { collections } from "../config";
import { IBrand } from "../interfaces/brand";

const brandSchema:Schema = new Schema<IBrand>(
    {
        name:{
            type:String,
            trim:true,
            required:[true, "brand name is required"],
            unique:[true, "this is already exists"],
            minlength: [3, "Too short brand name"],
            maxlength: [32, "Too long brand name"],
        },

        slug:String,

        image:{
            type:String,
            validate: {
                validator: function (value: string) {
                    return /\.(jpg|jpeg|png|webp)$/i.test(value);
                },
                message: (props:ValidatorProps) => `${props.value} is not a valid image extension`
            }
        }
    }
    ,
    {
        timestamps:true
    }
)

export const BrandModel = model<IBrand>(collections.brand , brandSchema)
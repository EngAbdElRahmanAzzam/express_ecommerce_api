import { Schema, model, ValidatorProps } from "mongoose";
const userSchema = new Schema(
    {
        name:{
            type:String,
            trim:true,
            required:[true, "username is required"],
            minlength: [3, "Too short username"],
            maxlength: [32, "Too long username"],
        },

        slug:String,

        profileImg: {
            type:String,
            validator: (val: string) =>  /\.(jpg|jpeg|png)$/i.test(val),
            message: (props: ValidatorProps) => `${props.value} is not a valid image URL!`
        },

        email:{
            type:String,
            trim:true,
            required:[true, "subcategory name is required"],
            unique:[true, "This name already exsits"],
            minlength: [3, "Too short subcategory name"],
            maxlength: [32, "Too long subcategory name"],
            validate:{
                validator:(val:string) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(val),
                message: (props:ValidatorProps) => `${props.value} is not a valid email!`
            }
        },

        password:{
            type:String,
            trim:true,
            required:[true, "user password is required"],
            minlength: [3, "Too short password"],
            maxlength: [32, "Too long password"],
            validate:{
                validator: (val:string) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(val),
                message: (props: ValidatorProps) => `Password must be at least 8 characters long and contain at least one letter and one number`
            }
        },

        phone:String,

        role:{
            type:String,
            enum:["user", "admin"],
            default:"user"
        }

    }
    ,
    {
        timestamps:true
    }
    ) 
export const UserModel = model("User", userSchema)
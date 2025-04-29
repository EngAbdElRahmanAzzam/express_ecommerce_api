import { Schema, model, ValidatorProps } from "mongoose";
import {hash} from "bcryptjs"

const userSchema = new Schema(
    {
        user$name:{
            type:String,
            trim:true,
            required:[true, "username is required"],
            minlength: [3, "Too short username"],
            maxlength: [32, "Too long username"],
        },

        user$slug:String,

        user$profileImg: {
            type:String,
            validator: (val: string) =>  /\.(jpg|jpeg|png)$/i.test(val),
            message: (props: ValidatorProps) => `${props.value} is not a valid image URL!`
        },

        user$email:{
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

        user$password:{
            type:String,
            trim:true,
            required:[true, "user password is required"],
        },

        user$phone:{
            type:String,
            unique: [true, "Phone number already exists"]
        },

        user$role:{
            type:String,
            enum:["user", "admin"],
            default:"user"
        },

        user$active:{
            type:Boolean,
            default:true
        },

    }
    ,
    {
        timestamps:true,

        toJSON: {
            virtuals: true,
            transform: function (doc, ret) {
                ret.username = ret["user$name"];
                ret.email = ret["user$email"];
                ret.profileImage = ret["user$profileImg"];
                ret.phone = ret["user$phone"];
                ret.role = ret["user$role"];
                ret.active = ret["user$active"];
                ret.id = doc._id.toString();
    
                delete ret._id;
                delete ret.__v;
                delete ret["user$name"];
                delete ret["user$email"];
                delete ret["user$password"];
                delete ret["user$profileImg"];
                delete ret["user$phone"];
                delete ret["user$role"];
                delete ret["user$active"];
                delete ret["user$slug"];
          
                return ret;
            }
        }

    }
) 

userSchema.pre("save", async function (next){
    if(this.user$password)
        this.user$password = await hash(this.user$password, 12);

    next();
})

export const UserModel = model("User", userSchema)
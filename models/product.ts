import { Schema, ValidatorProps, model } from "mongoose";

const productSchema = new Schema(
    {
        name:{
            type:String,
            trim:true,
            required:[true, "product name is required"],
            unique:[true, "name is already exists"],
            minlength: [3, "Too short product name"],
            maxlength: [32, "Too long product name"],

        },

        slug:{
            type:String,
        },

        decription:{
            type:String,
            trim:true,
            required:[true, "decription name is required"],
            unique:[true, "decription is already exists"],
            minlength: [5, "Too short product name"],
            maxlength: [5000, "Too long product name"],
        },

        price:{
            type:Number,
            required:true,
            min:10,
            max:1000000
        },

        priceAfterDiscound:{
            type:Number,
            min:10,
            max:1000000
        },

        thumbnail:{
            type:String,
            required:[true, "cover image is required"],
            validate: {
                validator: function (value: string) {
                    return /\.(jpg|jpeg|png|webp)$/i.test(value);
                },
                message: (props:ValidatorProps) => `${props.value} is not a valid image extension`
            }
        },

        images:{
            type:[String],
            validate: {
                validator: function (images: string[]) {
                    return images.every((image) => /\.(jpg|jpeg|png|webp)$/i.test(image));
                },
                message: (props:ValidatorProps) => `${props.value} is not a valid image extension`
            }
        },

        colors:{
            type: [String],
            validate: {
                validator: function (colors:string[]) {
                    return colors.every(color => /^#([0-9A-Fa-f]{6})$/.test(color));
                },
                message: (props:ValidatorProps) => `${props.value} contains invalid hex color(s)`
            }
        },

        quantity: {
            type: Number,
            required: [true, 'Product quantity is required'],
        },

        numOfSold: {
            type: Number,
            default: 0,
        },

        ratingsAverage: {
            type: Number,
            min: [0, 'Rating must be above or equal 0'],
            max: [5, 'Rating must be below or equal 5.0'],
        },

        ratingsNums: {
            type: Number,
            default: 0,
            min: 0
        },

        brand:{
            type:Schema.ObjectId,
            ref:"Brand",
            required:[true, "Brand is required"]
        },

        category:{
            type:Schema.ObjectId,
            ref:"Category",
            required:[true, "category is required"]
        },

        subcategory:[
            {
                type:Schema.ObjectId,
                ref:"Subcategory",
                required:[true, "Subcategory is required"]
            }
        ],

    },
    {
        timestamps:true
    }
)

export const ProductModel = model('Product', productSchema)
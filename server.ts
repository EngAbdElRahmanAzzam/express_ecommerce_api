import server, { NextFunction, Request, Response, json } from "express"
import morgan from "morgan"
import { APP_PORT } from "./config"
import { dbConnect } from "./db"
import { categoryRouter } from "./api/category"
import { subcategoryRouter } from "./api/subcategory"
import { brandRouter } from "./api/brand"
import { productRouter } from "./api/product"
import { userRouter } from "./api/user"
import { authRouter } from "./api/auth"
import "./interfaces/index"

const app = server()

// middlewares
app.use(morgan("dev"))
app.use(json())

app.use("/category",categoryRouter)
app.use("/subcategory",subcategoryRouter)
app.use("/brand", brandRouter)
app.use("/product", productRouter)
app.use("/user", userRouter)
app.use("/auth", authRouter)

app.use((error:any , req: Request, res: Response, next: NextFunction)=>{
    res.status(500).json({error})
    console.log(error)
})

app.listen(APP_PORT, ()=> {
    console.log(`Server is running on port ${APP_PORT}`)
    dbConnect()
})
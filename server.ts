import server, { json } from "express"
import morgan from "morgan"
import { APP_PORT } from "./config"
import { dbConnect } from "./db"



const app = server()

// middlewares
app.use(morgan("dev"))
app.use(json())

app.listen(APP_PORT, ()=> {
    console.log(`Server is running on port ${APP_PORT}`)
    dbConnect()
})
import server from "express"
import { APP_PORT } from "./config"
const app = server()


app.listen(APP_PORT, ()=> {
    console.log(`Server is running on port ${APP_PORT}`)
})
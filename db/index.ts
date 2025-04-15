import mongose from "mongoose"
import { DB_HOST } from "../config"

export const dbConnect = async () => {
    try{
        const connections = await mongose.connect(DB_HOST!)
        console.log(`sucess connect to database ${connections.connection.host}`)
    }catch(error){
        console.error("Failed to connect with database")
    }
} 
import dotenv from "dotenv"

dotenv.config()
export const APP_PORT = process.env.APP_PORT
export const APP_HOST = process.env.APP_HOST
export const DB_HOST = process.env.DB_HOST
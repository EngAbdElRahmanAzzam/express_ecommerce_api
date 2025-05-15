import { Router } from "express"
import { login, signUp } from "../services/auth"


export const authRouter = Router()

authRouter.post("/sign-up", signUp)
authRouter.post("/login", login)
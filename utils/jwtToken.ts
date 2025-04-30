import jwt from "jsonwebtoken"
import { JWT_KEY } from "../config";

export const createToken = (payload: any) => jwt.sign(payload, JWT_KEY);


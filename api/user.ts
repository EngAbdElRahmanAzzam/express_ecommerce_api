import { Router } from "express";
import { createUser, getUser, getUsers, updateUser, deleteUser , blockUser, re_activeUser, updateUserPassword } from "../services/user";


export const userRouter = Router()

userRouter.route("/")
    .post(createUser)
    .get(getUsers)

userRouter.route("/id")
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser)

userRouter.patch("/:id/update-password", updateUserPassword)
userRouter.patch("/:id/active", re_activeUser)
userRouter.patch("/:id/block", blockUser)
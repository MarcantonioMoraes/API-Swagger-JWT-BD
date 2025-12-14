import { Router } from "express"
import { createUser, listUsers } from "../controllers/user.controller.js"

export const userRoutes = Router()

userRoutes.get("/", listUsers)
userRoutes.post("/", createUser)

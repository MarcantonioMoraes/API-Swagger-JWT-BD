import express from "express"

export const app = express()

app.use(express.json())


import { userRoutes } from "./routes/user.routes.js"

app.use("/users", userRoutes)

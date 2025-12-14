import express from "express"
import { PrismaClient } from "@prisma/client"

export const prisma = new PrismaClient()

const app = express()
const port = 3000

// Middleware para ler JSON
app.use(express.json())

app.get("/", (req, res) => {
  res.send("API rodando com Express + TypeScript 🚀")
})

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`)
})

import type { Request, Response } from "express"
import { createUserService, listUsersService } from "../services/user.service.js"

export async function listUsers(req: Request, res: Response) {
  const users = await listUsersService()
  res.json(users)
}

export async function createUser(req: Request, res: Response) {
  const { name, email } = req.body

  const user = await createUserService(name, email)

  res.status(201).json(user)
}

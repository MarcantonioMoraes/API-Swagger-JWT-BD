import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { User } from "../entities/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userRepository = AppDataSource.getRepository(User);

export class AuthController {
  static async register(req: Request, res: Response) {
    const { nome, email, senha } = req.body;

    const userExists = await userRepository.findOneBy({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email já cadastrado" });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const user = userRepository.create({
      nome,
      email,
      senha: senhaHash,
    });

    await userRepository.save(user);

    return res.status(201).json({
      message: "Usuário criado com sucesso",
    });
  }

  static async login(req: Request, res: Response) {
    const { email, senha } = req.body;

    const user = await userRepository.findOneBy({ email });
    if (!user) {
      return res.status(401).json({ message: "Email ou senha inválidos" });
    }

    const senhaValida = await bcrypt.compare(senha, user.senha);
    if (!senhaValida) {
      return res.status(401).json({ message: "Email ou senha inválidos" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    return res.json({ token });
  }
}

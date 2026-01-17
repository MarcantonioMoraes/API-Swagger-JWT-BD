import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { User } from "../entities/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userRepository = AppDataSource.getRepository(User);

export class AuthController {
  
  /**
   * @openapi
   * /auth/register:
   *   post:
   *     tags:
   *       - Autenticação
   *     summary: Cadastro de usuário
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - nome
   *               - email
   *               - senha
   *             properties:
   *               nome:
   *                 type: string
   *                 example: João Silva
   *               email:
   *                 type: string
   *                 example: joao@email.com
   *               senha:
   *                 type: string
   *                 example: 123456
   *     responses:
   *       201:
   *         description: Usuário criado com sucesso
   *       400:
   *         description: Email já existente
   */

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

  /**
 * @openapi
 * /auth/login:
 *   post:
 *     tags:
 *       - Autenticação
 *     summary: Login do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *               senha:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Retorna token JWT
 *       401:
 *         description: Credenciais inválidas
 */
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

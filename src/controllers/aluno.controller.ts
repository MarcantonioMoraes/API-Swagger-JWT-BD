import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Aluno } from "../entities/Alunos";

const alunoRepository = AppDataSource.getRepository(Aluno);

export class AlunoController {
/**
 * @openapi
 * /alunos:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Alunos
 *     summary: Cria um aluno
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - curso
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               curso:
 *                 type: string
 *     responses:
 *       201:
 *         description: Aluno criado
 *       401:
 *         description: Não autorizado
 */
static async create(req: Request, res: Response) {
    const { nome, email, curso } = req.body;

    const aluno = alunoRepository.create({ nome, email, curso });
    await alunoRepository.save(aluno);

    return res.status(201).json(aluno);
  }

/**
 * @openapi
 * /alunos:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Alunos
 *     summary: Lista todos os alunos
 *     responses:
 *       200:
 *         description: Lista de alunos
 *       401:
 *         description: Não autorizado
 */
static async findAll(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    const alunos = await alunoRepository.find();
    return res.json(alunos);
  }

 /**
 * @openapi
 * /alunos/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Alunos
 *     summary: Busca aluno por ID
 *     parameters:
 *       - in: path
 *         name: ID do aluno
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Aluno encontrado
 *       404:
 *         description: Aluno não encontrado
 *       401:
 *         description: Não autorizado
 */
static async findOne(req: Request, res: Response) {
    const { id } = req.params;

    const aluno = await alunoRepository.findOneBy({ id: Number(id) });

    if (!aluno) {
      return res.status(404).json({ message: "Aluno não encontrado" });
    }

    return res.json(aluno);
  }

  /**
 * @openapi
 * /alunos/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Alunos
 *     summary: Atualiza um aluno
 *     parameters:
 *       - in: path
 *         name: ID do aluno
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Atualizado
 *       404:
 *         description: Aluno não encontrado
 *       401:
 *         description: Não autorizado
 */
static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { nome, email, curso } = req.body;

    const aluno = await alunoRepository.findOneBy({ id: Number(id) });

    if (!aluno) {
      return res.status(404).json({ message: "Aluno não encontrado" });
    }

    aluno.nome = nome;
    aluno.email = email;
    aluno.curso = curso;

    await alunoRepository.save(aluno);

    return res.json(aluno);
  }

  /**
 * @openapi
 * /alunos/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Alunos
 *     summary: Remove um aluno
 *     parameters:
 *       - in: path
 *         name: ID do aluno
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Removido com sucesso
 *       404:
 *         description: Aluno não encontrado
 *       401:
 *         description: Não autorizado
 */
static async delete(req: Request, res: Response) {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "ID inválido" });
  }

  const aluno = await alunoRepository.findOneBy({ id });

  if (!aluno) {
    return res.status(404).json({ message: "Aluno não encontrado" });
  }

  await alunoRepository.remove(aluno);

  return res.status(204).send();
}
}

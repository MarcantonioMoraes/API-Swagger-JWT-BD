import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Aluno } from "../entities/Alunos";

const alunoRepository = AppDataSource.getRepository(Aluno);

export class AlunoController {
  static async create(req: Request, res: Response) {
    const { nome, email, curso } = req.body;

    const aluno = alunoRepository.create({ nome, email, curso });
    await alunoRepository.save(aluno);

    return res.status(201).json(aluno);
  }

  static async findAll(req: Request, res: Response) {
    const alunos = await alunoRepository.find();
    return res.json(alunos);
  }

  static async findOne(req: Request, res: Response) {
    const { id } = req.params;

    const aluno = await alunoRepository.findOneBy({ id: Number(id) });

    if (!aluno) {
      return res.status(404).json({ message: "Aluno não encontrado" });
    }

    return res.json(aluno);
  }

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

  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    const aluno = await alunoRepository.findOneBy({ id: Number(id) });

    if (!aluno) {
      return res.status(404).json({ message: "Aluno não encontrado" });
    }

    await alunoRepository.remove(aluno);

    return res.status(204).send();
  }
}

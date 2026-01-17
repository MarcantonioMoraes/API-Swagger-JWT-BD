import { Router } from "express";
import { AlunoController } from "../controllers/aluno.controller";

const router = Router();

router.post("/", AlunoController.create);
router.get("/", AlunoController.findAll);
router.get("/:id", AlunoController.findOne);
router.put("/:id", AlunoController.update);
router.delete("/:id", AlunoController.delete);

export default router;

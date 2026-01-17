import { Router } from "express";
import { AlunoController } from "../controllers/aluno.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, AlunoController.create);
router.get("/", authMiddleware, AlunoController.findAll);
router.get("/:id", authMiddleware, AlunoController.findOne);
router.put("/:id", authMiddleware, AlunoController.update);
router.delete("/:id", authMiddleware, AlunoController.delete);

export default router;


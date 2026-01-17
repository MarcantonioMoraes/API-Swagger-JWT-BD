import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import alunoRoutes from "./routes/aluno.routes";
import authRoutes from "./routes/auth.routes";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/alunos", alunoRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API Faculdade rodando 🚀");
});

export default app;


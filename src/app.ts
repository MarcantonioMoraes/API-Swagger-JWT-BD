import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerConfig from "./config/swagger";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import alunoRoutes from "./routes/aluno.routes";
import authRoutes from "./routes/auth.routes";


dotenv.config();

const app = express();
const swaggerSpec = swaggerJsdoc(swaggerConfig);

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/alunos", alunoRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API Faculdade rodando 🚀");
});

export default app;


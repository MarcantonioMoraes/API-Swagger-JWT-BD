import { Options } from "swagger-jsdoc";

const swaggerConfig: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Faculdade - Alunos",
      version: "1.0.0",
      description: "API com autenticação JWT e CRUD de alunos",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/controllers/**/*.ts"],
};

export default swaggerConfig;

import "module-alias/register";
import { ENV } from "@/config/env";
import sequelize from "./database";
import app from "@/config/app";
import setupDocumentModel from "@/models/documento";

async function start() {
  try {
    // Inicializar modelos
    setupDocumentModel(sequelize);

    // Sincronizar banco de dados
    await sequelize.authenticate();
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
    
    // Em desenvolvimento, sincroniza as tabelas
    if (ENV.NODE_ENV === "development") {
      await sequelize.sync({ alter: true });
      console.log("Modelos sincronizados com o banco de dados.");
    }

    app.listen(ENV.PORT, () => {
      console.log(`Servidor rodando na porta ${ENV.PORT}`);
      if (ENV.SWAGGER_ENABLED) {
        console.log(`Documentação disponível em http://localhost:${ENV.PORT}/api-docs`);
      }
    });
  } catch (error) {
    console.error("Erro ao iniciar o servidor:", error);
    process.exit(1);
  }
}

start();

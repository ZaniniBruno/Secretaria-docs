import { Express } from "express";
import { ENV } from "./env";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";

export default (app: Express): void => {
  if (ENV.SWAGGER_ENABLED) {
    const swaggerDocument = YAML.load(path.resolve(__dirname, "..", "docs", "api", "swagger.yaml"));
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }
};

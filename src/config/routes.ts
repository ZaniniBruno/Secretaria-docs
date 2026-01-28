import { Express, Router } from "express";
import documentoRoutes from "@/routes/documento-routes";

export default (app: Express): void => {
  const router = Router();
  app.use("/api", router);
  documentoRoutes(router);
};

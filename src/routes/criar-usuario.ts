import { Router } from "express";
import {adaptRoute} from "../adapters/express-route-adapter";
import CriarUsuarioController from "../controllers/users/criar-usuario";
import { authMiddleware, authorizeRoles } from "../middlewares";
import { validateBody } from "../middlewares";
import { createUserSchema } from "../schemas";

export default (router: Router): void => {
  router.post(
    "/users",
    authMiddleware,
    authorizeRoles(["Gerente", "Funcionario"]),
    validateBody(createUserSchema),
    adaptRoute(new CriarUsuarioController())
  );
};

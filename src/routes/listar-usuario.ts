import { Router } from "express";
import {adaptRoute} from "../adapters/express-route-adapter";
import ListarUsuarioController from "../controllers/users/listar-usuario";
import { authMiddleware, authorizeRoles } from "../middlewares";

export default (router: Router): void => {
  router.get(
    "/users{/:id}",
    authMiddleware,
    authorizeRoles(["Gerente", "Funcionario"]),
    adaptRoute(new ListarUsuarioController())
  );
};

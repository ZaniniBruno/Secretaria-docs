import { Router } from "express";
import {adaptRoute} from "../adapters/express-route-adapter";
import DeletarUsuarioController from "../controllers/users/deletar-usuario";
import { authMiddleware, authorizeRoles } from "../middlewares";
export default (router: Router): void => {
  router.delete(
    "/users/:id",
    authMiddleware,
    authorizeRoles(["Gerente", "Funcionario"]),
    adaptRoute(new DeletarUsuarioController())
  );
};

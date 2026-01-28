import { Router } from "express";
import adaptRoute from "../adapters/express-route-adapter";
import RefreshTokenController from "../controllers/login/refresh-token";

export default (router: Router): void => {
  router.post("/refresh-token", adaptRoute(new RefreshTokenController()));
};

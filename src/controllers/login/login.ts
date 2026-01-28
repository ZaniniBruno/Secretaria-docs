import { unAuthorizedError } from "../../errors/un-authorized-error";
import {
  notFound,
  ok,
  serverError,
  unAuthorized,
} from "../../helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";
import { LoginService } from "../../service/login-service";
import { LoginDTO } from "../../types/login";

export class LoginController implements Controller {
  private readonly loginService: LoginService;

  public constructor(loginService: LoginService) {
    this.loginService = loginService;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, senha }: LoginDTO = httpRequest.body;
      const response = await this.loginService.login({ email, senha });
      if (!response) {
        return unAuthorized(new unAuthorizedError());
      }
      const perfil = await this.loginService.buscarPerfilPorUserId(response);
      if (!perfil) {
        return notFound({
          message: "Usuário não encontrado, verificar cadastro.",
        });
      }
      const user = perfil.user;
      const { token, refreshToken } = this.loginService.gerarTokens(user);
      return ok({
        message: "Login realizado com sucesso",
        token,
        refreshToken,
      });
    } catch (error) {
      return serverError(error);
    }
  }
}

export default LoginController;

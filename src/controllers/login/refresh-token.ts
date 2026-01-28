import {TokenAdapter} from "../../adapters/token-adapter";
import {
  forbidden,
  notFound,
  ok,
  serverError,
} from "../../helpers/http-helper";
import User from "../../models/user";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";
import { RefreshTokenDTO } from "../../types/login";

class RefreshTokenController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { refreshToken }: RefreshTokenDTO = httpRequest.body;

      if (!refreshToken) {
        return notFound({ message: "Refresh token é obrigatório" });
      }
      const tokenizer = new TokenAdapter();
      const decoded = tokenizer.verifyRefreshToken(refreshToken);

      const user = await User.findByPk(decoded.id);
      if (!user) {
        return forbidden({ message: "Refresh token inválido" });
      }

      const newAccessToken = tokenizer.generateToken({
        id: user.id,
        email: user.email,
      });

      return ok({ token: newAccessToken });
    } catch (error: any) {
      return serverError(error);
    }
  }
}

export default RefreshTokenController;

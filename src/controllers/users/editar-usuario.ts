import { BcryptAdapter } from "../../adapters//bcrypt-adapter";
import { ENV } from "../../config/env";
import { notFound, ok, serverError } from "../../helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";
import { UsuarioService } from "../../service/usuario-service";

class EditarUsuarioController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { id } = httpRequest.params;
    const { nome, email, senha } = httpRequest.body;
    try {
      const encrypter = new BcryptAdapter(ENV.SALT);
      const usuarioService = new UsuarioService(encrypter);
      const usuarioExiste = await usuarioService.validarUsuarioExistente(id);
      if (!usuarioExiste) {
        return notFound({ error: "Usuário não encontrado" });
      }
      const usuario = await usuarioService.atualizarUsuario(id, {
        nome,
        email,
        senha,
      });
      return ok(usuario);
    } catch (error: any) {
      return serverError();
    }
  }
}

export default EditarUsuarioController;

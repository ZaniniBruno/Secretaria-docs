import { BcryptAdapter } from "../../adapters//bcrypt-adapter";
import { ENV } from "../../config/env";
import { notFound, ok, serverError } from "../../helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";
import { UsuarioService } from "../../service/usuario-service";

class ListarUsuarioController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const userId = httpRequest.params.id;
      const encrypter = new BcryptAdapter(ENV.SALT);
      const usuarioService = new UsuarioService(encrypter);
      const usuario = await usuarioService.buscarUsuarioPorId(userId);
      if (!usuario && userId !== "{id}" && userId !== undefined) {
        return notFound({ error: "Usuário não encontrado" });
      } else if (userId !== "{id}" && userId !== undefined) {
        return ok(usuario);
      }
      const usuarios = await usuarioService.buscaTodosUsuarios();
      if (usuarios.length === 0) {
        return notFound({ error: "Nenhum usuário encontrado" });
      }
      return ok(usuarios);
    } catch (error: any) {
      return serverError();
    }
  }
}

export default ListarUsuarioController;

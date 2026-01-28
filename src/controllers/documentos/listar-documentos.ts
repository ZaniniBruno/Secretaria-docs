import { Controller } from "@/protocols/controller";
import { HttpRequest, HttpResponse } from "@/protocols/http";
import { DocumentModel } from "@/models/documento";

export class ListarDocumentosController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { userId } = httpRequest.query;
      const where = userId ? { userId } : {};
      
      const documentos = await DocumentModel.findAll({ where });

      return {
        statusCode: 200,
        body: documentos,
      };
    } catch (error: any) {
      return {
        statusCode: 500,
        body: new Error(error.message),
      };
    }
  }
}

// import { Controller } from "@/protocols/controller";
// import { HttpRequest, HttpResponse } from "@/protocols/http";
// import { DocumentModel } from "@/models/documento";
// import { ENV } from "@/config/env";

// export class UploadDocumentoController implements Controller {
//   async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
//     try {
//       const { userId } = httpRequest.body; 
//       const files = httpRequest.files as { [fieldname: string]: Express.Multer.File[] };

//       if (!userId) {
//         return {
//           statusCode: 400,
//           body: new Error("ID do usuário é obrigatório"),
//         };
//       }

//       // Validar se todos os arquivos obrigatórios foram enviados
//       const requiredFields = ["cpf", "rg", "comprovante", "historico"];
//       const missingFields = requiredFields.filter(field => !files[field] || files[field].length === 0);

//       if (missingFields.length > 0) {
//         return {
//           statusCode: 400,
//           body: new Error(`Arquivos obrigatórios ausentes: ${missingFields.join(", ")}`),
//         };
//       }

//       const createdDocuments = [];

//       // Mapeamento de campos para tipos do enum
//       const fieldToType: { [key: string]: any } = {
//         cpf: "CPF",
//         rg: "RG",
//         comprovante: "COMPROVANTE_RESIDENCIA",
//         historico: "HISTORICO_ESCOLAR"
//       };

//       for (const field of requiredFields) {
//         const file = files[field][0];
//         const documento = await DocumentModel.create({
//           userId,
//           type: fieldToType[field],
//           fileName: file.filename,
//           originalName: file.originalname,
//           mimeType: file.mimetype,
//           size: file.size,
//           path: file.path,
//           status: "PENDENTE",
//           url: `http://localhost:${ENV.PORT}/files/${file.filename}`
//         });
//         createdDocuments.push(documento);
//       }
      
//       return {
//         statusCode: 201,
//         body: { message: "Documentos enviados com sucesso",
//            documents: createdDocuments 
//           },
//       };
//     } catch (error: any) {
//       return {
//         statusCode: 500,
//         body: new Error(error.message),
//       };
//     }
//   }
// }
import { Controller } from "@/protocols/controller";
import { HttpRequest, HttpResponse } from "@/protocols/http";
import { DocumentModel } from "@/models/documento";
import { ENV } from "@/config/env";

export class UploadDocumentoController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { userId } = httpRequest.body;
      const files = httpRequest.files as Express.Multer.File[];

      if (!userId) {
        return { statusCode: 400, body: new Error("ID do usuário é obrigatório") };
      }

      if (!files || files.length === 0) {
        return { statusCode: 400, body: new Error("Nenhum arquivo enviado") };
      }

      // Mapeamento dos campos que precisamos
      const requiredFields = ["cpf", "rg", "comprovante", "historico"];
      const fieldToType: { [key: string]: string } = {
        cpf: "CPF",
        rg: "RG",
        comprovante: "COMPROVANTE_RESIDENCIA",
        historico: "HISTORICO_ESCOLAR"
      };

      const createdDocuments = [];

      for (const fieldName of requiredFields) {
        const file = files.find(f => f.fieldname === fieldName);
        
        if (!file) {
          return { statusCode: 400, body: new Error(`Arquivo obrigatório ausente: ${fieldName}`) };
        }

        const documento = await DocumentModel.create({
          userId,
          type: fieldToType[fieldName],
          fileName: file.filename,
          originalName: file.originalname,
          mimeType: file.mimetype,
          size: file.size,
          path: file.path,
          status: "PENDENTE",
          url: `http://localhost:${ENV.PORT}/files/${file.filename}`
        });
        createdDocuments.push(documento);
      }

      return {
        statusCode: 201,
        body: { message: "Documentos enviados com sucesso", documents: createdDocuments },
      };
    } catch (error: any) {
      return { statusCode: 500, body: new Error(error.message) };
    }
  }
}
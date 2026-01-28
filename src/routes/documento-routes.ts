// import { Router } from "express";
// import { adaptRoute } from "@/adapters/express-route-adapter";
// import { UploadDocumentoController } from "@/controllers/documentos/upload-documento";
// import { ListarDocumentosController } from "@/controllers/documentos/listar-documentos";
// import { upload } from "@/config/multer";

// export default (router: Router): void => {
//   router.post("/documentos/upload", upload.fields([
//     { name: "cpf", maxCount: 1 },
//     { name: "rg", maxCount: 1 },
//     { name: "comprovante", maxCount: 1 },
//     { name: "historico_escolar", maxCount: 1 },
//   ]),
//   adaptRoute(new UploadDocumentoController())
// );
//   router.get("/documentos", adaptRoute(new ListarDocumentosController()));
// };
import { Router } from "express";
import { adaptRoute } from "@/adapters/express-route-adapter";
import { UploadDocumentoController } from "@/controllers/documentos/upload-documento";
import { ListarDocumentosController } from "@/controllers/documentos/listar-documentos";
import { upload } from "@/config/multer";

export default (router: Router): void => {
  router.post(
    "/documentos/upload", 
    upload.any(), // Aceita qualquer campo de arquivo
    adaptRoute(new UploadDocumentoController())
  );
  router.get("/documentos", adaptRoute(new ListarDocumentosController()));
};
import { Controller } from "@/protocols/controller";
import { HttpRequest } from "@/protocols/http";
import { Request, Response } from "express";

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    console.log("Arquivos recebidos:", req.files);
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params,
      query: req.query,
      file: req.file,
      files: req.files,
    };
    const httpResponse = await controller.handle(httpRequest);
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body);
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message,
      });
    }
  };
};

export class unAuthorizedError extends Error {
  constructor() {
    super();
    this.name = "unAuthorizedError";
    this.message = "Verifique os dados de login.";
  }
}

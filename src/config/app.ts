import express from "express";
import cors from "cors";
import setupRoutes from "./routes";
import setupMiddlewares from "./middlewares";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());

app.use('/files', express.static(path.resolve(__dirname, '..','..',
 'uploads')));

setupMiddlewares(app);
setupRoutes(app);

export default app;

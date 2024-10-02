import cors from "cors";
import express from "express";
import helmet from "helmet";
import { config } from "./config";
import routes from "./routes";
import { StatusCodes } from "./status-codes";
import { NotFoundErrorResponse } from "./error-responses";

export function createServer() {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: config.server.allowedOrigin }));

  app.use("/", routes);

  app.use((_, res: express.Response) => {
    res.status(StatusCodes.NOT_FOUND).json(new NotFoundErrorResponse());
  });

  return app;
}

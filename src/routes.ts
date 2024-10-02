import express from "express";
import {
  handleGetPlayer,
  handleGetPlayers,
  handleGetPositions,
} from "./controllers";

const routes = express.Router();

routes.get("/player/:id", handleGetPlayer);
routes.get("/players", handleGetPlayers);
routes.get("/positions", handleGetPositions);

export default routes;

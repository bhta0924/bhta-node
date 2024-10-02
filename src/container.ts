import { SleeperPlayersDataSource } from "./data-sources/sleeper-players-data-source";
import {
  createGetPlayersUseCase,
  createGetPlayerUseCase,
  createGetPositionsUseCase,
} from "./use-cases";
import { config } from "./config";
import { LocalDbPlayersDataSource } from "./data-sources/local-db-players-data-source";

const playersDataSource = config.data.bypassLocalDb
  ? new SleeperPlayersDataSource()
  : new LocalDbPlayersDataSource();

export const getPlayers = createGetPlayersUseCase(playersDataSource);
export const getPlayer = createGetPlayerUseCase(playersDataSource);
export const getPositions = createGetPositionsUseCase(playersDataSource);

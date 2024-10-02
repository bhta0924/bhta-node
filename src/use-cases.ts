import { Uuid } from "types";
import { GetPlayersQuery, IPlayersDataSource } from "./contracts";

export const createGetPlayersUseCase = (
  dataSource: IPlayersDataSource
): ((query?: GetPlayersQuery) => Promise<unknown>) => {
  return async (query) => {
    const result = await dataSource.getPlayers(query);

    return result;
  };
};

export const createGetPlayerUseCase = (
  dataSource: IPlayersDataSource
): ((playerId: Uuid) => Promise<unknown>) => {
  return async (playerId: Uuid) => {
    const result = await dataSource.getPlayer(playerId);

    if (!result) {
      return Promise.reject(new PlayerNotFound());
    }

    return result;
  };
};

export const createGetPositionsUseCase = (
  dataSource: IPlayersDataSource
): (() => Promise<string[]>) => {
  return async () => {
    const result = await dataSource.getPositions();

    return result;
  };
};

export class PlayerNotFound extends Error {
  constructor() {
    super();

    Object.setPrototypeOf(this, PlayerNotFound.prototype);
  }
}

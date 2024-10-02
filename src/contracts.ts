import { Uuid } from "./types";

export interface GetPlayersQuery {
  limit?: number;
  offset?: number;
  position?: string;
}

// TODO: Use proper model instead of "any".
export interface IPlayersDataSource {
  getPlayer: (id: Uuid) => Promise<unknown>;
  getPlayers: (query?: GetPlayersQuery) => Promise<unknown[]>;
  getPositions: () => Promise<string[]>;
}

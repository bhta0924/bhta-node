import { GetPlayersQuery, IPlayersDataSource } from "../contracts";
import { Uuid } from "../types";

// TODO: Implement with prisma database.
export class LocalDbPlayersDataSource implements IPlayersDataSource {
  async getPlayer(id: Uuid) {
    return null;
  }

  async getPlayers(query?: GetPlayersQuery) {
    return [];
  }

  async getPositions() {
    return [];
  }
}

import { GetPlayersQuery, IPlayersDataSource } from "../contracts";
import { Uuid } from "../types";
import { getSleeperPlayersData } from "../lib/get-sleeper-players-data";
import { mapWithEspnImage } from "../utils/map-with-espn-image";

export class SleeperPlayersDataSource implements IPlayersDataSource {
  async getPlayer(id: Uuid) {
    const data = await getSleeperPlayersData();

    if (!data) {
      return null;
    }

    return id in data
      ? { ...data[id], image_url: mapWithEspnImage(data[id].espn_id) }
      : null;
  }

  async getPlayers(query?: GetPlayersQuery) {
    const limit = query?.limit ?? 10;
    const offset = query?.offset ?? 0;
    const position = query?.position ?? null;

    const data = await getSleeperPlayersData();

    if (!data) {
      return [];
    }

    return Object.values(data)
      .filter((item) => (position ? item.position === position : true))
      .slice(offset, offset + limit)
      .map((item) => ({ ...item, image_url: mapWithEspnImage(item.espn_id) }));
  }

  async getPositions() {
    const data = await getSleeperPlayersData();

    if (!data) {
      return [];
    }

    return Array.from(
      Object.values(data).reduce((out, current) => {
        if (current.position) {
          out.add(current.position);
        }

        return out;
      }, new Set<string>())
    );
  }
}

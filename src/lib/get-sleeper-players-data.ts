import { logger } from "../utils/logger";
import { z } from "zod";

const ENDPOINT_URL: string = "https://api.sleeper.app/v1/players/nfl";

export const SleeperDataItemValidator = z.object({
  age: z.number().optional().nullable(),
  birth_date: z.string().optional().nullable(),
  college: z.string().optional().nullable(),
  espn_id: z.number().optional().nullable(),
  first_name: z.string(),
  height: z.string().optional().nullable(),
  last_name: z.string(),
  number: z.number().optional().nullable(),
  years_exp: z.number().optional().nullable(),
  player_id: z.string(),
  position: z.string().optional().nullable(),
});

export type SleeperDataItemType = z.infer<typeof SleeperDataItemValidator>;

export const SleeperDataValidator = z.array(SleeperDataItemValidator);

/**
 * Resolves with null if sleeper data source fails to provide data in expected structure.
 */
export const getSleeperPlayersData = () =>
  fetch(ENDPOINT_URL)
    .then((response) => response.json())
    .then((response) => {
      const validationResult = SleeperDataValidator.safeParse(
        Object.values(response)
      );

      if (!validationResult.success) {
        logger.err(
          "[ERROR] Failed to parse sleeper data source.",
          validationResult.error
        );

        console.log("ti", validationResult.error);

        return null;
      }

      return response as Record<string, SleeperDataItemType>;
    })
    .catch(() => null);

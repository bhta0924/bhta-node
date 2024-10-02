import { PrismaClient } from "@prisma/client";
import { getSleeperPlayersData } from "lib/get-sleeper-players-data";

const db = new PrismaClient();

const run = async () => {
  const data = await getSleeperPlayersData();

  // TODO: Save parsed data to database.

  console.log("FINISHED");
};

run();

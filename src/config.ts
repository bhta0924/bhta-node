import dotenv from "dotenv";

dotenv.config();

const ALLOWED_ORIGIN = process.env.SERVER_ALLOWED_ORIGIN;
const DATA_BYPASS_LOCAL_DB = process.env.DATA_BYPASS_LOCAL_DB;
const PORT = process.env.SERVER_PORT;

const data = {
  bypassLocalDb: DATA_BYPASS_LOCAL_DB === "1",
};

const server = {
  allowedOrigin: ALLOWED_ORIGIN,
  port: PORT,
};

export const config = {
  data,
  server,
};

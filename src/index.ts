import { config } from "./config";
import { createServer } from "./server";
import { logger } from "./utils/logger";

const server = createServer();

server.listen(config.server.port, () => {
  logger.log(`Server running on port ${config.server.port}`);
});

import express from "express";
import { getPlayer, getPlayers, getPositions } from "./container";
import { StatusCodes } from "./status-codes";
import {
  BadRequestErrorResponse,
  InternalServerErrorResponse,
  NotFoundErrorResponse,
} from "./error-responses";
import { PlayerNotFound } from "./use-cases";
import { z } from "zod";
import { logger } from "./utils/logger";

const GetPlayersHandlerRequestValidator = z.object({
  limit: z.string().regex(/^\d+$/).transform(Number).optional(),
  offset: z.string().regex(/^\d+$/).transform(Number).optional(),
  position: z.string().optional(),
});

export const handleGetPlayers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const validationResult = GetPlayersHandlerRequestValidator.safeParse(
      req.query
    );

    if (!validationResult.success) {
      logger.err("Invalid request", validationResult.error);

      res
        .status(StatusCodes.BAD_REQUEST)
        .json(new BadRequestErrorResponse("Bad request"));

      return;
    }

    const { limit, offset, position } = validationResult.data;

    const result = await getPlayers({ limit, offset, position });

    res
      .status(StatusCodes.OK)
      .json({
        limit,
        offset,
        result,
        position,
        totalResults: (result as Array<unknown>)?.length ?? 0,
      })
      .end();
  } catch (e: unknown) {
    logger.err("[ERROR] handleGetPlayers", e);

    const message = (e as Error).message || (e as Error).stack || e;

    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(new InternalServerErrorResponse(message as string));
  }
};

export const handleGetPlayer = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const playerId = req.params.id;

    const result = await getPlayer(playerId);

    res.status(StatusCodes.OK).json(result).end();
  } catch (e: unknown) {
    logger.err("[ERROR] handleGetPlayer", e);

    if (e instanceof PlayerNotFound) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json(new NotFoundErrorResponse("Player not found"));
    } else {
      const message = (e as Error).message || (e as Error).stack || e;

      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(new InternalServerErrorResponse(message as string));
    }
  }
};

export const handleGetPositions = async (
  _: express.Request,
  res: express.Response
) => {
  const result = await getPositions();

  res.status(StatusCodes.OK).json(result).end();
};

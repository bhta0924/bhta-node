-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "playerId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Player_playerId_key" ON "Player"("playerId");

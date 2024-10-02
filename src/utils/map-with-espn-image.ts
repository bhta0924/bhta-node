export const mapWithEspnImage = (espnId?: number | null): string | null =>
  espnId
    ? `https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/${espnId}.png&w=350&h=254`
    : null;

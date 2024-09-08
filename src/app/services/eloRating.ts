const K_FACTOR = 32;

export function calculateNewRatings(teamARating: number, teamBRating: number, teamAWon: boolean) {
  const expectedScoreA = 1 / (1 + Math.pow(10, (teamBRating - teamARating) / 400));
  const expectedScoreB = 1 - expectedScoreA;

  const actualScoreA = teamAWon ? 1 : 0;
  const actualScoreB = 1 - actualScoreA;

  const newRatingA = Math.round(teamARating + K_FACTOR * (actualScoreA - expectedScoreA));
  const newRatingB = Math.round(teamBRating + K_FACTOR * (actualScoreB - expectedScoreB));

  return [newRatingA, newRatingB];
}
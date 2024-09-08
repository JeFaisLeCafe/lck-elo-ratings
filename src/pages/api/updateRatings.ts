import { getRatings, updateRating } from '@/app/services/database';
import { calculateNewRatings } from '@/app/services/eloRating';
import { fetchLCKMatches } from '@/app/services/pandaScore';
import { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const matches = await fetchLCKMatches();
      const currentRatings = await getRatings();

      for (const match of matches) {
        const teamA = currentRatings.find(team => team.teamId === match.opponents[0].opponent.id);
        const teamB = currentRatings.find(team => team.teamId === match.opponents[1].opponent.id);

        if (teamA && teamB) {
          const teamAWon = match.winner_id === teamA.teamId;
          const [newRatingA, newRatingB] = calculateNewRatings(teamA.rating, teamB.rating, teamAWon);

          await updateRating(teamA.teamId, teamA.teamName, newRatingA);
          await updateRating(teamB.teamId, teamB.teamName, newRatingB);
        } else {
          // If a team is not in our database, add it with a default rating
          if (!teamA) {
            await updateRating(match.opponents[0].opponent.id, match.opponents[0].opponent.name, 1500);
          }
          if (!teamB) {
            await updateRating(match.opponents[1].opponent.id, match.opponents[1].opponent.name, 1500);
          }
        }
      }

      res.status(200).json({ message: 'Ratings updated successfully' });
    } catch (error) {
      console.error('Failed to update ratings:', error);
      res.status(500).json({ error: 'Failed to update ratings' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
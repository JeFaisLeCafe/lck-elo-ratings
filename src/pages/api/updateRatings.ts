/* eslint-disable @typescript-eslint/no-explicit-any */
import { getLastUpdated, getRatings, updateLastUpdated, updateRating } from '@/app/services/database';
import { calculateNewRatings } from '@/app/services/eloRating';
import { fetchLCKMatches } from '@/app/services/pandaScore';
import { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      console.log('Getting last updated date...');
      const lastUpdated = await getLastUpdated();
      console.log(`Last updated: ${lastUpdated}`);

      console.log('Fetching LCK matches...');
      const matches = await fetchLCKMatches(lastUpdated || undefined);
      console.log(`Fetched ${matches.length} matches`);

      console.log('Getting current ratings...');
      const currentRatings = await getRatings();
      console.log(`Got ${currentRatings.length} current ratings`);

      let latestMatchDate = lastUpdated || new Date(0);

      for (const match of matches) {
        if (!match.opponents || match.opponents.length < 2) {
          console.log('Skipping match due to insufficient opponent data', match.id);
          continue;
        }

        const teamA = match.opponents[0]?.opponent;
        const teamB = match.opponents[1]?.opponent;

        if (!teamA || !teamB) {
          console.log('Skipping match due to missing team data', match.id);
          continue;
        }

        const teamARating = currentRatings.find(team => team.team_id === teamA.id);
        const teamBRating = currentRatings.find(team => team.team_id === teamB.id);

        if (teamARating && teamBRating) {
          const teamAWon = match.winner_id === teamA.id;
          const [newRatingA, newRatingB] = calculateNewRatings(teamARating.rating, teamBRating.rating, teamAWon);

          await updateRating(teamA.id, teamA.name, newRatingA);

          await updateRating(teamB.id, teamB.name, newRatingB);
        } else {
          if (!teamARating) {
            console.log(`Adding new team: ${teamA.name}`);
            await updateRating(teamA.id, teamA.name, 1500);
          }
          if (!teamBRating) {
            console.log(`Adding new team: ${teamB.name}`);
            await updateRating(teamB.id, teamB.name, 1500);
          }
        }

        const matchDate = new Date(match.begin_at);
        if (matchDate > latestMatchDate) {
          latestMatchDate = matchDate;
        }
      }

      // Update the last updated date
      await updateLastUpdated(latestMatchDate);

      res.status(200).json({ message: 'Ratings updated successfully', lastUpdated: latestMatchDate });
    } catch (error: any) {
      console.error('Failed to update ratings:', error);
      res.status(500).json({ error: 'Failed to update ratings', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
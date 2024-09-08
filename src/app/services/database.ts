import { TeamRating } from '@/types/database';
import { sql } from '@vercel/postgres';


export async function initializeDatabase() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS team_ratings (
        team_id INT PRIMARY KEY,
        team_name VARCHAR(255) NOT NULL,
        rating INT NOT NULL
      );
    `;
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

export async function getRatings(): Promise<TeamRating[]> {
  try {
    const result = await sql<TeamRating>`SELECT * FROM team_ratings ORDER BY rating DESC`;
    return result.rows;
  } catch (error) {
    console.error('Error fetching ratings:', error);
    throw error;
  }
}

export async function updateRating(teamId: number, teamName: string, newRating: number): Promise<void> {
  try {
    await sql`
      INSERT INTO team_ratings (team_id, team_name, rating)
      VALUES (${teamId}, ${teamName}, ${newRating})
      ON CONFLICT (team_id)
      DO UPDATE SET rating = ${newRating}, team_name = ${teamName};
    `;
    console.log(`Rating updated for team ${teamName}`);
  } catch (error) {
    console.error(`Error updating rating for team ${teamName}:`, error);
    throw error;
  }
}
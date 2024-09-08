import { sql } from '@vercel/postgres';

export interface TeamRating {
  teamId: number;
  teamName: string;
  rating: number;
}

export async function initializeDatabase() {
  await sql`
    CREATE TABLE IF NOT EXISTS team_ratings (
      team_id INT PRIMARY KEY,
      team_name VARCHAR(255) NOT NULL,
      rating INT NOT NULL
    );
  `;
}

export async function getRatings(): Promise<TeamRating[]> {
  const result = await sql<TeamRating>`SELECT * FROM team_ratings ORDER BY rating DESC`;
  return result.rows;
}

export async function updateRating(teamId: number, teamName: string, newRating: number): Promise<void> {
  await sql`
    INSERT INTO team_ratings (team_id, team_name, rating)
    VALUES (${teamId}, ${teamName}, ${newRating})
    ON CONFLICT (team_id)
    DO UPDATE SET rating = ${newRating}, team_name = ${teamName};
  `;
}
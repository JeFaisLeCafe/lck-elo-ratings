import { getRatings } from '@/app/services/database';
import { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const ratings = await getRatings();
      res.status(200).json(ratings);
    } catch (error) {
      console.error('Failed to fetch ratings:', error);
      res.status(500).json({ error: 'Failed to fetch ratings' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
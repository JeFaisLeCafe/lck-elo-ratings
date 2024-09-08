import { getLastUpdated } from '@/app/services/database';
import { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const lastUpdated = await getLastUpdated();
      res.status(200).json({ lastUpdated });
    } catch (error) {
      console.error('Failed to fetch last updated date:', error);
      res.status(500).json({ error: 'Failed to fetch last updated date' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
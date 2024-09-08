import { initializeDatabase } from '@/app/services/database';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      await initializeDatabase();
      res.status(200).json({ message: 'Database initialized successfully' });
    } catch (error) {
      console.error('Failed to initialize database:', error);
      res.status(500).json({ error: 'Failed to initialize database' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

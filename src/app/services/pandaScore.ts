/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiMatch } from '@/types/api';
import axios from 'axios';

const PANDASCORE_API_KEY = process.env.PANDASCORE_API_KEY;
const PANDASCORE_API_URL = 'https://api.pandascore.co/lol/matches/past';

export async function fetchLCKMatches(since?: Date, page = 1, perPage = 100) {
  try {
  const params: any = {
      'filter[league_id]': 293, // LCK league ID,
      'sort': 'begin_at',
      'page': page,
      'per_page': perPage
    };

    if (since) {
      params['range[begin_at]'] = `${since.toISOString()},${new Date().toISOString()}`;

    }

    const response = await axios.get<ApiMatch[]>(PANDASCORE_API_URL, {
      params: params,
      headers: {
        'Authorization': `Bearer ${PANDASCORE_API_KEY}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching LCK matches:', error);
    throw error;
  }
}
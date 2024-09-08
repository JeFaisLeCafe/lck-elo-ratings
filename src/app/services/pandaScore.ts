import axios from 'axios';

const PANDASCORE_API_KEY = process.env.PANDASCORE_API_KEY;
const PANDASCORE_API_URL = 'https://api.pandascore.co/lol/matches';

export async function fetchLCKMatches(page = 1, perPage = 100) {
  try {
    const response = await axios.get(PANDASCORE_API_URL, {
      params: {
        'filter[league_id]': 293, // LCK league ID
        'sort': '-begin_at',
        'page': page,
        'per_page': perPage
      },
      headers: {
        'Authorization': `Bearer ${PANDASCORE_API_KEY}`
      }
    });
    console.log('PandaScore API response:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('Error fetching LCK matches:', error);
    throw error;
  }
}
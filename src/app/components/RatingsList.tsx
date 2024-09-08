import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TeamRating } from '@/types/database';
const RatingsList: React.FC = () => {
  const [ratings, setRatings] = useState<TeamRating[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);

  useEffect(() => {
    fetchRatings();
  }, []);

  const fetchRatings = async () => {
    try {
      const response = await axios.get<TeamRating[]>('/api/ratings');
      setRatings(response.data);
      const lastUpdatedResponse = await axios.get<{ lastUpdated: string }>('/api/lastUpdated');
      setLastUpdated(lastUpdatedResponse.data.lastUpdated);
    } catch (error) {
      console.error('Error fetching ratings:', error);
    }
  };

  const handleUpdateRatings = async () => {
    setIsUpdating(true);
    try {
      const response = await axios.post('/api/updateRatings');
      await fetchRatings();
      setLastUpdated(response.data.lastUpdated);
    } catch (error) {
      console.error('Error updating ratings:', error);
    }
    setIsUpdating(false);
  };

  const handleInitializeDatabase = async () => {
    setIsInitializing(true);
    try {
      await axios.post('/api/initDb');
      alert('Database initialized successfully');
      await fetchRatings();
    } catch (error) {
      console.error('Error initializing database:', error);
      alert('Failed to initialize database');
    }
    setIsInitializing(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">LCK Team Ratings</h1>
      <div className="mb-4 flex justify-between items-center">
        <div>
          <button
            onClick={handleUpdateRatings}
            disabled={isUpdating}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 mr-2"
          >
            {isUpdating ? 'Updating...' : 'Update Ratings'}
          </button>
          <button
            onClick={handleInitializeDatabase}
            disabled={isInitializing}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          >
            {isInitializing && process.env.NODE_ENV === 'development' ? 'Initializing...' : 'Initialize Database'}
          </button>
        </div>
        {lastUpdated && (
          <p className="text-gray-600">
            Last updated: {new Date(lastUpdated).toLocaleString()}
          </p>
        )}
      </div>
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-left">Rank</th>
            <th className="px-4 py-2 text-left">Team</th>
            <th className="px-4 py-2 text-left">Rating</th>
          </tr>
        </thead>
        <tbody>
          {ratings.map((team, index) => (
            <tr key={team.team_id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{team.team_name}</td>
              <td className="px-4 py-2">{team.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RatingsList;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface TeamRating {
  teamId: number;
  teamName: string;
  rating: number;
}

const RatingsList: React.FC = () => {
  const [ratings, setRatings] = useState<TeamRating[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchRatings();
  }, []);

  const fetchRatings = async () => {
    try {
      const response = await axios.get<TeamRating[]>('/api/ratings');
      setRatings(response.data);
    } catch (error) {
      console.error('Error fetching ratings:', error);
    }
  };

  const handleUpdateRatings = async () => {
    setIsUpdating(true);
    try {
      await axios.post('/api/updateRatings');
      await fetchRatings();
    } catch (error) {
      console.error('Error updating ratings:', error);
    }
    setIsUpdating(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">LCK Team Ratings</h1>
      <div className="mb-4">
        <button
          onClick={handleUpdateRatings}
          disabled={isUpdating}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          {isUpdating ? 'Updating...' : 'Update Ratings'}
        </button>
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
            <tr key={team.teamId} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{team.teamName}</td>
              <td className="px-4 py-2">{team.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RatingsList;
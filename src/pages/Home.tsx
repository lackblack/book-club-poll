import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getActivePolls, getPastPolls, Poll } from '../services/pollService';
import { FaPlus, FaHistory } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';

const Home: React.FC = () => {
  const [activePolls, setActivePolls] = useState<Poll[]>([]);
  const [pastPolls, setPastPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        setLoading(true);
        const [active, past] = await Promise.all([
          getActivePolls(),
          getPastPolls()
        ]);
        setActivePolls(active);
        setPastPolls(past);
      } catch (error) {
        console.error('Error fetching polls:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPolls();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center" style={{ height: '50vh' }}>
        <p>Loading polls...</p>
      </div>
    );
  }

  return (
    <div>
      <section className="section">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Active Polls</h2>
          {currentUser && (
            <Link to="/create-poll" className="btn btn-primary flex items-center gap-2">
              <FaPlus size={14} />
              Create New Poll
            </Link>
          )}
        </div>

        {activePolls.length === 0 ? (
          <div className="card p-4 text-center">
            <p>No active polls at the moment.</p>
            {currentUser && (
              <Link to="/create-poll" className="btn btn-primary mt-3 inline-block">
                Create the first poll
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activePolls.map(poll => (
              <Link key={poll.id} to={`/poll/${poll.id}`} className="card p-4 hover:shadow-lg">
                <h3 className="font-bold mb-2">{poll.title}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{poll.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm">{poll.books.length} books</span>
                  <span className="text-sm">{poll.voters.length} votes</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {pastPolls.length > 0 && (
        <section className="section">
          <div className="flex items-center gap-2 mb-4">
            <FaHistory size={18} />
            <h2 className="text-2xl font-bold">Past Polls</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pastPolls.map(poll => (
              <Link key={poll.id} to={`/poll/${poll.id}`} className="card p-4 hover:shadow-lg">
                <h3 className="font-bold mb-2">{poll.title}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{poll.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm">{poll.books.length} books</span>
                  <span className="text-sm">{poll.voters.length} votes</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Home; 
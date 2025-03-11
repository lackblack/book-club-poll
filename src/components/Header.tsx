import React from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaPlus } from 'react-icons/fa';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container flex justify-between items-center" style={{ height: '80px' }}>
        <Link to="/" className="flex items-center gap-2">
          <FaBook size={24} color="#4361ee" />
          <h1 className="text-xl font-bold">Book Club Poll</h1>
        </Link>
        
        <nav>
          <ul className="flex gap-4 items-center">
            <li>
              <Link to="/" className="hover:text-blue-600">Home</Link>
            </li>
            <li>
              <Link to="/create-poll" className="flex items-center gap-1 hover:text-blue-600">
                <FaPlus size={14} />
                Create Poll
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 
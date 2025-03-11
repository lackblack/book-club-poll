import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FaBook, FaSignOutAlt, FaUser, FaPlus } from 'react-icons/fa';

const Header: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

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
            
            {currentUser ? (
              <>
                <li>
                  <Link to="/create-poll" className="flex items-center gap-1 hover:text-blue-600">
                    <FaPlus size={14} />
                    Create Poll
                  </Link>
                </li>
                <li>
                  <Link to="/profile" className="flex items-center gap-1 hover:text-blue-600">
                    <FaUser size={14} />
                    Profile
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-1 hover:text-blue-600"
                  >
                    <FaSignOutAlt size={14} />
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="hover:text-blue-600">Login</Link>
                </li>
                <li>
                  <Link to="/register" className="btn btn-primary">Register</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 
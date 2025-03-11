import React from 'react';
import { FaHeart } from 'react-icons/fa';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white shadow-sm py-4 mt-auto">
      <div className="container">
        <div className="flex justify-center items-center gap-1">
          <p>© {currentYear} Book Club Poll. Made with</p>
          <FaHeart color="#e63946" />
          <p>for book lovers.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
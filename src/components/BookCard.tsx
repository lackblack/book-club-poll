import React from 'react';
import { Book } from '../services/openLibraryApi';
import { getBookCoverUrl } from '../services/openLibraryApi';
import { FaPlus, FaCheck, FaVoteYea } from 'react-icons/fa';

interface BookCardProps {
  book: Book;
  isSelected?: boolean;
  votes?: number;
  showVotes?: boolean;
  onSelect?: () => void;
  onVote?: () => void;
  canVote?: boolean;
  isPollActive?: boolean;
}

const BookCard: React.FC<BookCardProps> = ({
  book,
  isSelected = false,
  votes = 0,
  showVotes = false,
  onSelect,
  onVote,
  canVote = false,
  isPollActive = true
}) => {
  const coverUrl = book.cover_i ? getBookCoverUrl(book.cover_i) : '/placeholder-book.png';
  const authors = book.author_name?.join(', ') || 'Unknown Author';
  const year = book.first_publish_year || 'Unknown Year';

  return (
    <div className={`card ${isSelected ? 'border-2 border-blue-500' : ''}`}>
      <div className="relative">
        <img 
          src={coverUrl} 
          alt={`Cover of ${book.title}`} 
          className="w-full h-64 object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder-book.png';
          }}
        />
        {isSelected && (
          <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
            <FaCheck size={16} />
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-bold mb-2 line-clamp-2">{book.title}</h3>
        <p className="text-sm text-gray-600 mb-1">{authors}</p>
        <p className="text-sm text-gray-600 mb-3">Published: {year}</p>
        
        {showVotes && (
          <div className="flex justify-between items-center mb-3">
            <span className="font-bold">{votes} vote{votes !== 1 ? 's' : ''}</span>
          </div>
        )}
        
        {onSelect && (
          <button 
            onClick={onSelect} 
            className={`btn w-full ${isSelected ? 'btn-secondary' : 'btn-primary'}`}
          >
            {isSelected ? 'Remove' : (
              <span className="flex items-center justify-center gap-2">
                <FaPlus size={14} /> Add to Poll
              </span>
            )}
          </button>
        )}
        
        {onVote && isPollActive && (
          <button 
            onClick={onVote} 
            className="btn btn-primary w-full flex items-center justify-center gap-2"
            disabled={!canVote}
          >
            <FaVoteYea size={16} /> 
            {canVote ? 'Vote' : 'Already Voted'}
          </button>
        )}
      </div>
    </div>
  );
};

export default BookCard; 
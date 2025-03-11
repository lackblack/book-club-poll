import axios from 'axios';

export interface Book {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
  publisher?: string[];
  isbn?: string[];
}

export interface SearchResponse {
  numFound: number;
  start: number;
  docs: Book[];
}

const BASE_URL = 'https://openlibrary.org';

export const searchBooks = async (query: string): Promise<Book[]> => {
  try {
    const response = await axios.get<SearchResponse>(`${BASE_URL}/search.json`, {
      params: {
        q: query,
        limit: 20,
      },
    });
    
    return response.data.docs;
  } catch (error) {
    console.error('Error searching books:', error);
    throw error;
  }
};

export const getBookCoverUrl = (coverId: number, size: 'S' | 'M' | 'L' = 'M'): string => {
  if (!coverId) return '';
  
  const sizeMap = {
    S: 'small',
    M: 'medium',
    L: 'large',
  };
  
  return `https://covers.openlibrary.org/b/id/${coverId}-${sizeMap[size]}.jpg`;
};

export const getBookDetails = async (key: string): Promise<any> => {
  try {
    const response = await axios.get(`${BASE_URL}${key}.json`);
    return response.data;
  } catch (error) {
    console.error('Error fetching book details:', error);
    throw error;
  }
}; 
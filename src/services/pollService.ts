import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  serverTimestamp, 
  Timestamp,
  increment,
  DocumentReference
} from 'firebase/firestore';
import { db } from './firebase';
import { Book } from './openLibraryApi';

export interface PollBook extends Book {
  votes: number;
}

export interface Poll {
  id?: string;
  title: string;
  description: string;
  createdBy: string;
  createdAt: Timestamp;
  endDate: Timestamp | null;
  isActive: boolean;
  showResults: boolean;
  books: PollBook[];
  voters: string[];
}

export const createPoll = async (pollData: Omit<Poll, 'id' | 'createdAt' | 'voters'>): Promise<string> => {
  try {
    const pollRef = await addDoc(collection(db, 'polls'), {
      ...pollData,
      createdAt: serverTimestamp(),
      voters: []
    });
    return pollRef.id;
  } catch (error) {
    console.error('Error creating poll:', error);
    throw error;
  }
};

export const getPoll = async (pollId: string): Promise<Poll | null> => {
  try {
    const pollRef = doc(db, 'polls', pollId);
    const pollSnap = await getDoc(pollRef);
    
    if (pollSnap.exists()) {
      return { id: pollSnap.id, ...pollSnap.data() } as Poll;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting poll:', error);
    throw error;
  }
};

export const getActivePolls = async (): Promise<Poll[]> => {
  try {
    const q = query(
      collection(db, 'polls'),
      where('isActive', '==', true),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Poll));
  } catch (error) {
    console.error('Error getting active polls:', error);
    throw error;
  }
};

export const getPastPolls = async (): Promise<Poll[]> => {
  try {
    const q = query(
      collection(db, 'polls'),
      where('isActive', '==', false),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Poll));
  } catch (error) {
    console.error('Error getting past polls:', error);
    throw error;
  }
};

export const getUserPolls = async (userId: string): Promise<Poll[]> => {
  try {
    const q = query(
      collection(db, 'polls'),
      where('createdBy', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Poll));
  } catch (error) {
    console.error('Error getting user polls:', error);
    throw error;
  }
};

export const updatePoll = async (pollId: string, pollData: Partial<Poll>): Promise<void> => {
  try {
    const pollRef = doc(db, 'polls', pollId);
    await updateDoc(pollRef, pollData);
  } catch (error) {
    console.error('Error updating poll:', error);
    throw error;
  }
};

export const deletePoll = async (pollId: string): Promise<void> => {
  try {
    const pollRef = doc(db, 'polls', pollId);
    await deleteDoc(pollRef);
  } catch (error) {
    console.error('Error deleting poll:', error);
    throw error;
  }
};

export const voteForBook = async (pollId: string, bookKey: string, userId: string): Promise<void> => {
  try {
    const pollRef = doc(db, 'polls', pollId);
    const pollSnap = await getDoc(pollRef);
    
    if (!pollSnap.exists()) {
      throw new Error('Poll not found');
    }
    
    const pollData = pollSnap.data() as Poll;
    
    if (pollData.voters.includes(userId)) {
      throw new Error('User has already voted in this poll');
    }
    
    // Find the book index
    const bookIndex = pollData.books.findIndex(book => book.key === bookKey);
    
    if (bookIndex === -1) {
      throw new Error('Book not found in poll');
    }
    
    // Update the book votes and add user to voters
    await updateDoc(pollRef, {
      [`books.${bookIndex}.votes`]: increment(1),
      voters: [...pollData.voters, userId]
    });
  } catch (error) {
    console.error('Error voting for book:', error);
    throw error;
  }
}; 
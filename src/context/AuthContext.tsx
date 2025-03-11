import React, { createContext } from 'react';

// Create a simplified context that doesn't require authentication
interface AuthContextType {
  currentUser: { id: string; displayName: string } | null;
  loading: boolean;
}

// Create a default anonymous user
const anonymousUser = {
  id: 'anonymous',
  displayName: 'Anonymous User'
};

export const AuthContext = createContext<AuthContextType>({
  currentUser: anonymousUser,
  loading: false
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Always provide the anonymous user
  const value = {
    currentUser: anonymousUser,
    loading: false
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { MOCK_USER } from '../constants';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string, isAuthor?: boolean) => Promise<void>;
  logout: () => void;
  consumeToken: () => boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check local storage for session simulation
    const storedUser = localStorage.getItem('aleerpe_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Logic to detect test author account
    const isTestAuthor = email.toLowerCase() === 'author@aleerpe.com';

    // For demo purposes, accept any email with mock password
    // In real app: validate against backend
    const loggedUser: User = {
        ...MOCK_USER,
        id: isTestAuthor ? 'author-1' : MOCK_USER.id,
        email: email,
        username: isTestAuthor ? 'Pedro Autor' : email.split('@')[0],
        handle: `@${email.split('@')[0]}`,
        tokens: 5, // Reset tokens on new login session for demo joy
        isAuthor: isTestAuthor, // Grant author permissions if email matches
        avatarUrl: isTestAuthor ? 'https://picsum.photos/id/64/200/200' : MOCK_USER.avatarUrl
    };

    setUser(loggedUser);
    localStorage.setItem('aleerpe_user', JSON.stringify(loggedUser));
    setIsLoading(false);
  };

  const register = async (username: string, email: string, password: string, isAuthor: boolean = false) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    const newUser: User = {
        id: `u-${Date.now()}`,
        username,
        email,
        handle: `@${username.toLowerCase()}`,
        avatarUrl: `https://ui-avatars.com/api/?name=${username}&background=random`,
        isVerified: false,
        tokens: 3, // Free welcome tokens
        isAuthor: isAuthor
    };

    setUser(newUser);
    localStorage.setItem('aleerpe_user', JSON.stringify(newUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('aleerpe_user');
  };

  const consumeToken = (): boolean => {
    if (!user) return false;
    if (user.tokens <= 0) return false;

    const updatedUser = { ...user, tokens: user.tokens - 1 };
    setUser(updatedUser);
    localStorage.setItem('aleerpe_user', JSON.stringify(updatedUser));
    return true;
  };

  return (
    <AuthContext.Provider value={{ 
        user, 
        isAuthenticated: !!user, 
        login, 
        register, 
        logout, 
        consumeToken, 
        isLoading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

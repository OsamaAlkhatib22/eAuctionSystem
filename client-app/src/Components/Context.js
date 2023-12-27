import { createContext, useContext } from 'react';
import {useState, useEffect} from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);

  const setAuthToken = (newToken) => {
    console.log('context file: New token:', newToken);
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  useEffect(() => {
    // Optional: Add logic to handle token expiration or cleanup
    // For example, you can check the token's expiration date and remove it if it's expired.
    // This depends on your authentication mechanism.

    // Cleanup function
    return () => {
      // Cleanup logic, if needed
    };
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
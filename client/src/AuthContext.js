// src/AuthContext.js
import { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const checkSession = async () => {
    try {
      const res = await fetch('http://localhost:3001/auth/check-session', {
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        setIsLoggedIn(true);
        setUser(data.user); // expect { id, name, email } or whatever your backend sends
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch (err) {
      console.error('Error checking session:', err);
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  useEffect(() => {
    checkSession(); // Run once on mount
  }, []);

  // useEffect(() => {
  //   console.log("Authenticated user:", user);
  // }, [user]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, checkSession, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
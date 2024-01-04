// UserContext.js

import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    retrieveUserData();
  }, []);

  const storeUserData = async (userData) => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      await AsyncStorage.setItem('last_login_mobile', JSON.stringify(userData.mobile));
      setUser(userData);
    } catch (error) {
      console.error('Error storing user data:', error);
    }
  };

  const retrieveUserData = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem('userData');
      if (storedUserData) {
        setUser(JSON.parse(storedUserData));
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
    }
  };
  const getLastLoginMobile =async () => {
    try {
      let mobile = await AsyncStorage.getItem('last_login_mobile');
      return mobile;
    } catch (error) {
      console.error('Error retrieving user data:', error);
      return "";
    }
  };
  const clearUserData = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      setUser(null);
    } catch (error) {
      console.error('Error clearing user data:', error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        storeUserData,
        clearUserData,
        getLastLoginMobile
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export { UserProvider, useUser };

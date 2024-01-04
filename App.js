// // App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import { UserProvider } from './context/UserContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Dashboard" component={Dashboard}   options={{ headerShown: false }} />

        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};


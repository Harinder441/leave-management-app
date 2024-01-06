// // App.js

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import ApplyLeaveForm from "./components/ApplyLeaveForm";
import { UserProvider } from "./context/UserContext";
import { Provider as PaperProvider } from "react-native-paper";
const Stack = createStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="LeaveForm">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
            <Stack.Screen name="LeaveForm" component={ApplyLeaveForm} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </UserProvider>
  );
}

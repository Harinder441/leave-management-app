// // App.js

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import ApplyLeaveForm from "./components/ApplyLeaveForm";
import LeaveStatus from "./components/LeaveStatusPage";
import { UserProvider } from "./context/UserContext";
import { Provider as PaperProvider } from "react-native-paper";
import { SnackbarProvider } from "./context/SnackbarContext";
const Stack = createStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <PaperProvider>
        <SnackbarProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
              <Stack.Screen name="LeaveForm" component={ApplyLeaveForm} />
              <Stack.Screen name="LeaveStatus" component={LeaveStatus} />
            </Stack.Navigator>
          </NavigationContainer>
        </SnackbarProvider>
      </PaperProvider>
    </UserProvider>
  );
}

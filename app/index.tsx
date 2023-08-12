import React from "react";
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AppPermissionsProvider } from "../contexts/appPermissionsProvider";
import { PhoneOrientationProvider } from "../contexts/phoneOrientationProvider";

import HomeScreen from "../screens/HomeScreen";
import CardScreen from "../screens/CardScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <AppPermissionsProvider>
        <PhoneOrientationProvider>
          <Stack.Navigator>
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CardScreen"
              component={CardScreen}
            />
          </Stack.Navigator>
        </PhoneOrientationProvider>
      </AppPermissionsProvider>
    </NavigationContainer>
  )
}
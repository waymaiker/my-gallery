import React from "react";
import { PhoneOrientationProvider } from "../contexts/phoneOrientationProvider";

import HomeScreen from "../screens/HomeScreen";

export default function App() {
  return (
    <PhoneOrientationProvider>
      <HomeScreen />
    </PhoneOrientationProvider>
  )
}
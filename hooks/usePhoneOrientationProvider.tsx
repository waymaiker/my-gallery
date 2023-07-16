import { useContext } from "react";
import PhoneOrientationProvider from "../contexts/phoneOrientationProvider";

export default function usePhoneOrientationProvider() {
  const context = useContext(PhoneOrientationProvider)

  if(!context) {
      throw new Error('useAndroidPermissionsProvider must be used within a phoneOrientationProvider')
  }
  return context
}
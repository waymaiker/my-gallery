import { useContext } from "react";
import AndroidPermissionsContext from "../contexts/androidPermissionsProvider";

export default function useAndroidPermissionsProvider() {
  const context = useContext(AndroidPermissionsContext)

  if(!context) {
      throw new Error('useAndroidPermissionsProvider must be used within a AndroidPermissionsProvider')
  }
  return context
}
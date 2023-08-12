import { useContext } from "react";
import AppPermissionsContext from "../contexts/appPermissionsProvider";

export default function useAppPermissionsProvider() {
  const context = useContext(AppPermissionsContext)

  if(!context) {
      throw new Error('useAppPermissionsProvider must be used within a AndroidPermissionsProvider')
  }
  return context
}
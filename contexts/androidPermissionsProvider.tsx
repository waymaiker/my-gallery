import{ createContext, useEffect, useState } from "react"
import { PermissionsAndroid, Platform } from "react-native";
import { PermissionStatus } from "expo-image-picker";
import AsyncStorage from '@react-native-async-storage/async-storage';


type ItemProps = {
  children: any
}
export interface AndroidPermissionInterface {
  askPermissions: Function,
  isPermissionGranted: boolean,
}

const defaultValue = {
  askPermissions: ()=>{},
  isPermissionGranted: false,
} as AndroidPermissionInterface;

const AndroidPermissionsContext = createContext<AndroidPermissionInterface>(defaultValue);

export const AndroidPermissionsProvider = ({ children }: ItemProps) => {
  const [isPermissionGranted, setPermission] = useState(false);
  const [permissionsAsked, setPermissionsAsked] = useState(false);

  const permissionType = Platform.Version >= 33
      ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
      : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

  const checkPermissions = async () => {
    const hasPermission = await PermissionsAndroid.check(permissionType);
    if(hasPermission) setPermission(true);
    await AsyncStorage.setItem('isPermissionGranted', JSON.stringify(isPermissionGranted));
  }

  const askPermissions = async () => {
    const status = await PermissionsAndroid.request(permissionType);
    if(status == PermissionStatus.GRANTED) setPermission(true)
    await AsyncStorage.setItem('isPermissionGranted', JSON.stringify(isPermissionGranted));
  }

  useEffect(()=>{
    if(permissionsAsked){
      askPermissions()
      checkPermissions()
      setPermissionsAsked(false)
    }
  },[permissionsAsked])

  return (
    <AndroidPermissionsContext.Provider
      value={{
        askPermissions,
        isPermissionGranted,
      }}
    >
      {children}
    </AndroidPermissionsContext.Provider>
  )
}

export default AndroidPermissionsContext;
import React from "react";
import{ createContext, useState } from "react"
import { PermissionsAndroid, Platform } from "react-native";
import { PermissionStatus } from "expo-image-picker";

type ItemProps = {
  children: any
}
export interface AndroidPermissionInterface {
  askDataPermissions: Function,
  askCameraPermissions: Function,
  isDataPermissionGranted: boolean,
  isCameraPermissionGranted: boolean,
}

const defaultValue = {
  askDataPermissions: ()=>{},
  askCameraPermissions: ()=>{},
  isDataPermissionGranted: false,
  isCameraPermissionGranted: false,
} as AndroidPermissionInterface;

const AndroidPermissionsContext = createContext<AndroidPermissionInterface>(defaultValue);

export const AndroidPermissionsProvider = ({ children }: ItemProps) => {
  const [isDataPermissionGranted, setDataPermission] = useState(false);
  const [isCameraPermissionGranted, setCameraPermission] = useState(false);

  const permissionType = Platform.Version >= 33
      ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
      : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

  const askDataPermissions = async () => {
    const status = await PermissionsAndroid.request(permissionType);
    if(status == PermissionStatus.GRANTED) setDataPermission(true)
  }

  const askCameraPermissions = async () => {
    const status = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
    if(status == PermissionStatus.GRANTED) setCameraPermission(true)
  }

  return (
    <AndroidPermissionsContext.Provider
      value={{
        askDataPermissions,
        askCameraPermissions,
        isDataPermissionGranted,
        isCameraPermissionGranted
      }}
    >
      {children}
    </AndroidPermissionsContext.Provider>
  )
}

export default AndroidPermissionsContext;
import React from "react";
import { createContext, useState } from "react"
import { PermissionsAndroid, Platform } from "react-native";

import * as Device from 'expo-device';
import { Camera } from 'expo-camera';
import { PermissionStatus } from "expo-image-picker";
import * as MediaLibrary from 'expo-media-library';

type ItemProps = {
  children: any
}
export interface AppPermissionInterface {
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
} as AppPermissionInterface;

const AppPermissionsContext = createContext<AppPermissionInterface>(defaultValue);

export const AppPermissionsProvider = ({ children }: ItemProps) => {
  const [isDataPermissionGranted, setDataPermission] = useState(false);
  const [isCameraPermissionGranted, setCameraPermission] = useState(false);

  const askDataPermissions = async () => {
    if(Device.osName === 'Android'){
      const permissionType = Platform.Version >= 33
      ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
      : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

      const status = await PermissionsAndroid.request(permissionType);
      if(status == PermissionStatus.GRANTED) setDataPermission(true)

    } else if (Device.osName === 'iOS'){
      const status = await MediaLibrary.requestPermissionsAsync();
      setDataPermission(status.status === 'granted')
    }
  }

  const askCameraPermissions = async () => {
    if(Device.osName === 'android'){
      const status = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
      if(status == PermissionStatus.GRANTED) setCameraPermission(true)

    } else if (Device.osName === 'iOS'){
      const status = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(status.status === 'granted')
    }
  }

  return (
    <AppPermissionsContext.Provider
      value={{
        askDataPermissions,
        askCameraPermissions,
        isDataPermissionGranted,
        isCameraPermissionGranted
      }}
    >
      {children}
    </AppPermissionsContext.Provider>
  )
}

export default AppPermissionsContext;
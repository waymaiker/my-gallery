import React, { useEffect, createContext, useState } from "react";
import { Dimensions } from "react-native";

type ItemProps = {
  children: any
}

export interface PhoneOrientationInterface {
  isPortrait: boolean,
  definePhoneOrientation: () => void
}

const defaultValue = {
  isPortrait: true,
  definePhoneOrientation: () => {}
} as PhoneOrientationInterface;

const PhoneOrientationContext = createContext<PhoneOrientationInterface>(defaultValue);

export const PhoneOrientationProvider = ({ children }: ItemProps) => {
  const [isPortrait, setIsPortrait] = useState(defaultValue.isPortrait)

  const setPhoneOrientation = () => {
    const dim = Dimensions.get('screen');
    setIsPortrait(dim.height >= dim.width)
  }

  const definePhoneOrientation = () => {
    Dimensions.addEventListener('change', () => {
      setPhoneOrientation()
    });
  }

  useEffect(()=>{ definePhoneOrientation() }, [isPortrait])

  return (
    <PhoneOrientationContext.Provider
      value={{
        isPortrait,
        definePhoneOrientation
      }}
    >
      {children}
    </PhoneOrientationContext.Provider>
  )
}

export default PhoneOrientationContext;
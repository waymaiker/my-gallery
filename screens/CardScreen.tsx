import React from "react";
import { Text, View } from "react-native";

import usePhoneOrientationProvider from "../hooks/usePhoneOrientationProvider";

import ImageCard from "../components/ImageCard";

type CardScreenProps = {
  route: { params: { title: string, uri: string } }
}

export default function CardScreen({route}: CardScreenProps) {
  const { params: { title, uri } } = route;

  //Hooks
  const { isPortrait } = usePhoneOrientationProvider()

  const textStyle = { padding: isPortrait ? 0 : 15 }
  return (
    <View style={ !isPortrait && { flexDirection: 'row', alignItems: 'center', justifyContent: "center" }}>
      <ImageCard
        uri={uri}
        fullScreen={true}
      />
      <Text style={{
        backgroundColor: "white",
        textAlign: 'center',
        fontSize: 20,
        borderRadius: 10,
        ...textStyle
      }}>
        Name: {title}
      </Text>
    </View>
  );
}
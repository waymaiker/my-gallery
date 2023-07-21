import React from "react";
import { Text, View } from "react-native";


import ImageCard from "../components/ImageCard";
import usePhoneOrientationProvider from "../hooks/usePhoneOrientationProvider";

type CardScreenProps = {
  route: { params: { title: string, uri: string } }
}

export default function CardScreen({route}: CardScreenProps) {
  const { params: { title, uri } } = route;
  const { isPortrait } = usePhoneOrientationProvider()

  return (
    <View style={{ flexDirection: isPortrait ? 'column' : 'row', alignItems: 'center', justifyContent: "center", padding: 20 }}>
      <Text style={{
        backgroundColor: "white",
        textAlign: 'center',
        fontSize: 20,
        borderRadius: 10,
        padding: 10,
        marginBottom: 10
      }}>
        {title}
      </Text>
      <ImageCard
        uri={uri}
        fullScreen={true}
      />
    </View>
  );
}
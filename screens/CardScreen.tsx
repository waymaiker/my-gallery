import React from "react";
import { Text, View } from "react-native";


import ImageCard from "../components/ImageCard";
import usePhoneOrientationProvider from "../hooks/usePhoneOrientationProvider";

type CardScreenProps = {
  route: { params: { title: string, uri: string, id: number, size: {'height': number, 'width': number} } }
}

export default function CardScreen({route}: CardScreenProps) {
  const { params: { id, title, uri, size } } = route;
  const { isPortrait } = usePhoneOrientationProvider()
  const isSquare = size['height'] != undefined ? size['height'] > 2*size['width'] : false;

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
        id={id}
        uri={uri}
        sizeType="large"
        isSquare={isSquare}
      />
    </View>
  );
}
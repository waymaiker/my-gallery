import React from "react";
import { Text, View } from "react-native";


import ImageCard from "../components/ImageCard";

type CardScreenProps = {
  route: { params: { title: string, uri: string } }
}

export default function CardScreen({route}: CardScreenProps) {
  const { params: { title, uri } } = route;

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "center" }}>
      <Text style={{
        backgroundColor: "white",
        textAlign: 'center',
        fontSize: 20,
        borderRadius: 10,
      }}>
        Name: {title}
      </Text>
      <ImageCard
        uri={uri}
        fullScreen={true}
      />
    </View>
  );
}
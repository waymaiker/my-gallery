import React from "react";
import { View , Image, Dimensions } from "react-native";

type ItemProps = {
  id: number,
  uri: string,
  sizeType?: string
};

export default function ImageCard({id, uri, sizeType}: ItemProps) {
  const screenWidth = Dimensions.get('window').width;
  const isLarge:boolean = sizeType == 'large';

  const sT = () => {
    switch(sizeType){
      case 'medium':
        return { width: screenWidth, aspectRatio: 1 };
      case 'large':
        return { width: screenWidth, height: '80%', aspectRatio: 1/2 }
      default:
        return { width: screenWidth/3, aspectRatio: 1 };
    }
  }

  return (
    <View style={ isLarge ? {padding: 10} : {}}>
      <Image
        key={id}
        source={{uri: uri}}
        style={sT()}
      />
    </View>
  );
}

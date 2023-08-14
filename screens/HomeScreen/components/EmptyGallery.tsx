import React from "react";
import { Text, View } from "react-native/types";

export default function EmptyGallery (){
  return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{fontSize: 20}}> Your gallery is currently empty </Text>
  </View>
} 
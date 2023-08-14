import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Icons } from "../../../constants/constants";

type BottomGalleryProps = {
  addPhoto:Function
}

export default function BottomGallery({addPhoto}:BottomGalleryProps){
  return (
    <View style={style.container}>
      <TouchableOpacity style={style.itemSelected} onPress={() => addPhoto()}>
        {Icons['add-white']}
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    postition: "absolute",
    bottom: 0,
    zIndex: 1000,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    backgroundColor: 'black',
  },
  itemSelected: {
    zIndex: 1000,
    bottom: 20,
    borderWidth: 5,
    borderRadius: 100,
    alignItems: "center",
    padding: 5,
    width: "20%",
    backgroundColor: 'black'
  }
});
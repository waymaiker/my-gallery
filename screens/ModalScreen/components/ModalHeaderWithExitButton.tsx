import React from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ItemsProps = {
  action: Function
}

export default function ModalHeaderWithExitButton({action} : ItemsProps){
  return <View style={styles.Title}>
    <Text style={styles.Text}> Add a photo </Text>
    <TouchableOpacity onPress={()=>action()}>
      <Ionicons name="md-close" size={20} />
    </TouchableOpacity>
  </View>
}

const styles = StyleSheet.create({
  Title: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingHorizontal: 5
  },
  Text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 15,
    textAlign: 'center',
  },
});
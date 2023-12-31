import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Icons } from "../constants/constants";

type CustomButtonAttributesType = {
  action: Function,
  text?: string,
  isDisabled?: boolean,
  withIcon?: string,
  backgroundColor?: string
};

export default function CustomButton({ action, text, isDisabled, withIcon, backgroundColor }: CustomButtonAttributesType) {
  const isBackgroundColor = backgroundColor != undefined ? {backgroundColor: backgroundColor} : {};

  return <TouchableOpacity
    testID="custom-button"
    style={ withIcon == undefined ? [isDisabled ? styles.buttonDisabled : styles.buttonClose, styles.button, isBackgroundColor] : {}}
    onPress={ isDisabled ? () => {} : () => action()}
  >
    {
      withIcon == undefined
        ? <Text style={styles.textStyle}> {text} </Text>
        : Icons[withIcon]
    }
  </TouchableOpacity>
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    padding: 10,
    margin: 5,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  buttonDisabled: {
    opacity: 0.5,
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
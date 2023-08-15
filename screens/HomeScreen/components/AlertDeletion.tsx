import React from "react";
import { StyleSheet, Text, View } from "react-native"
import CustomButton from "../../../components/CustomButton";

import CustomModal from "../../../components/CustomModal"
import ModalHeaderWithExitButton from "../../ModalScreen/components/ModalHeaderWithExitButton"


type Props = {
  isVisible: boolean,
  setVisibility: Function,
  resetSelectedPictures: Function,
  deleteSelectedPictures: Function
}

export default function AlertDeletion({isVisible, setVisibility, resetSelectedPictures, deleteSelectedPictures}: Props){
  return <CustomModal
    isVisible={isVisible}
    setVisibility={setVisibility}
    children={
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <ModalHeaderWithExitButton title="Are you sure ?" action={() => resetSelectedPictures()}/>
          <View style={{paddingHorizontal:8}}>
            <Text style={{fontSize: 18}}> Delete all selected pictures </Text>
            <Text style={{color: 'red', fontSize: 10, fontWeight: 'bold'}}> This action is not reversible </Text>
          </View>
          <View style={styles.modalFooter}>
            <CustomButton text="NO" backgroundColor="grey" action={()=> resetSelectedPictures()}/>
            <CustomButton text="YES" backgroundColor="red" action={()=> deleteSelectedPictures()}
            />
          </View>
        </View>
      </View>
      }
  />
}

const styles = StyleSheet.create({
  modalFooter: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 10
  },
  modalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    width: "90%",
    backgroundColor: 'white',
    justifyContent: 'space-around',
    borderRadius: 10,
    padding: 5
  },
});
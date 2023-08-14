import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Device from 'expo-device';

import CustomButton from "../../../components/CustomButton"

type HeaderGalleryProps = {
  addPhoto: Function,
  deletePhoto: Function,
  setSelectedPictures: Function,
  picturesCurrentlySelected: Array<any>
}

export default function HeaderGallery({addPhoto, deletePhoto, setSelectedPictures, picturesCurrentlySelected}:HeaderGalleryProps) {
  const isPicturesCurrentlySelected = picturesCurrentlySelected.length > 0;

  const DeletePhotoButton = () => (
    <CustomButton
      withIcon="trash"
      action={() => deletePhoto()}
    />
  )

  const UnSelectAllPhotosButton = () => (
    <CustomButton
      withIcon="cross"
      action={() => setSelectedPictures([])}
    />
  )

  const HeaderLeft = () => {
    return <View style={{ flexDirection: 'row', width:'33%', justifyContent: 'flex-start' }}>
      { isPicturesCurrentlySelected && <UnSelectAllPhotosButton /> }
    </View>
  }

  const HeaderRight = () => {
    return <View style={{ flexDirection: 'row', width:'33%', justifyContent:'flex-end' }}>
      { isPicturesCurrentlySelected && <DeletePhotoButton /> }
    </View>
  }

  const HeaderTitle = () => {
    return isPicturesCurrentlySelected
      ? <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontWeight:'bold', fontSize:15 }}> Selected </Text>
          {
            Device.osName === 'iOS'
             ? <View style={style.iosNumberOfSelection}>
                <Text> {picturesCurrentlySelected.length} </Text>
               </View>
             : <Text style={style.androidNumberOfSelection}> {picturesCurrentlySelected.length} </Text>
          }
        </View>
      : <Text style={{fontWeight:'bold', fontSize:15 }}> My Portfolio </Text>
  }

  return <View style={{
    flexDirection: 'row',
    width: '100%',
    justifyContent:'space-around',
    backgroundColor: 'white',
    paddingTop: 10,
  }}>
    <HeaderLeft />
    <HeaderTitle />
    <HeaderRight />
  </View>
}

const style = StyleSheet.create({
  androidNumberOfSelection: { backgroundColor:'grey', padding:5, borderRadius: 20 },
  iosNumberOfSelection: { backgroundColor:'grey', padding:5, borderRadius: 20 }
});
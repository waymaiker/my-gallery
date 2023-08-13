import React from "react";
import { Text, View } from "react-native";

import CustomButton from "../../../components/CustomButton"

type HeaderGalleryProps = {
  addPhoto: Function,
  deletePhoto: Function,
  setSelectedPictures: Function,
  picturesCurrentlySelected: Array<any>
}

export default function HeaderGallery({addPhoto, deletePhoto, setSelectedPictures, picturesCurrentlySelected}:HeaderGalleryProps) {
  const isPicturesCurrentlySelected = picturesCurrentlySelected.length > 0;

  const AddPhotoButton = () => (
    <CustomButton
      withIcon="add"
      action={() => addPhoto()}
    />
  )

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
      <AddPhotoButton />
    </View>
  }

  const HeaderTitle = () => {
    return isPicturesCurrentlySelected
      ? <View style={{ flexDirection: 'row' }}>
          <Text style={{fontWeight:'bold', fontSize:15 }}> Selected </Text>
          <Text style={{ backgroundColor:'grey', borderRadius: 20 }}> {picturesCurrentlySelected.length} </Text>
        </View>
      : <Text style={{fontWeight:'bold', fontSize:15 }}> My Portfolio </Text>
  }

  return <View style={{
    flexDirection: 'row',
    width: '100%',
    justifyContent:'space-around',
    backgroundColor: 'white',
    padding: 10
  }}>
    <HeaderLeft />
    <HeaderTitle />
    <HeaderRight />
  </View>
}
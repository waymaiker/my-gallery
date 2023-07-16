
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import useAndroidPermissionsProvider from "../../hooks/useAndroidPermissionsProvider";

import CustomButton from '../../components/CustomButton';
import ModalHeaderWithExitButton from './components/ModalHeaderWithExitButton';
import CustomModal from '../../components/CustomModal';

type ItemProps = {
  modalVisible: boolean,
  setModalVisible: Function,
  setMyGallery: Function
};

export default function ModalScreen({modalVisible, setModalVisible, setMyGallery}: ItemProps) {
  //States
  const [pictureTitle, setPictureTitle] = useState('')
  const [pictureURI, setPictureURI] = useState<string>('')
  const [isPictureSelected, setIsPictureSelected] = useState(false)
  const [nmbersOfPictures, setNmberOfPictures] = useState<number>(0)

  //Hooks
  const { control, watch, reset, } = useForm();
  const { isPermissionGranted, askPermissions } = useAndroidPermissionsProvider();

  //Expected effects
  useEffect(()=>{
    watch((value) => setPictureTitle(value['title']));
  },[pictureTitle])

  const showMyGallery = async () => {
    if(pictureTitle.length > 0){
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1
      });

      if(!result.canceled){
        const uri:string = result.assets[0].uri;
        setPictureURI(uri)
        setNmberOfPictures(nmbersOfPictures => nmbersOfPictures + 1);
        setIsPictureSelected(true)
      }
    } else {
      alert('Please add a title to your picture')
    }
  }

  const resetAll = () => {
    setModalVisible(false)
    setIsPictureSelected(false)
    setPictureURI('')
    reset({title: ''})
  }

  const ModalFooter = () => (
    <View style={styles.modalFooter}>
      <CustomButton text="Cancel" action={()=>resetAll()}/>
      {
        isPictureSelected
        && <CustomButton
            text="Add Picture"
            action={
              () => {
                setMyGallery((myGallery:object[]) => [...myGallery, {'id': nmbersOfPictures, 'title': pictureTitle, 'uri': pictureURI }])
                resetAll()
              }
            }
          />
        }
    </View>
  )

  return (
    <CustomModal
      isVisible={modalVisible}
      setVisibility={() => setModalVisible(!modalVisible)}
    >
      <View style={styles.container}>
        <View style={styles.modalView}>
          <ModalHeaderWithExitButton action={() => resetAll()}/>
          <View style={styles.modalForm}>
            <Text style={styles.modalFormTitle}>Title:</Text>
            <Controller
              control={control}
              name='title'
              rules={{required: true}}
              render={
                ({field: {onChange, value}}) =>
                  <TextInput
                    style={{ padding: 10, borderWidth: 1, borderColor: 'grey', borderRadius: 10 }}
                    onChangeText={value => onChange(value)}
                    value={value}
                  />
              }
            />
          </View>
          {
            isPictureSelected
            ? <AntDesign
                name="checkcircle"
                size={20}
                color='green'
                style={{textAlign:'center', justifyContent: 'space-between' }}
                children={ <Text> A picture has been selected </Text>}
              />
            : <CustomButton
                text="Choose a Picture"
                action={
                  isPermissionGranted
                    ? () => showMyGallery()
                    : async () => await askPermissions()
                }
              />
          }
          <ModalFooter />
        </View>
      </View>
    </CustomModal>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    width: "80%",
    backgroundColor: 'white',
    justifyContent: 'space-around',
    borderRadius: 10,
    padding: 5
  },
  modalForm: {
    padding: 10
  },
  modalFormTitle: {
    marginBottom: 10
  },
  modalFooter: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 10
  }
});
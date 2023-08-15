import React from "react";
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";

import useAppPermissionsProvider from "../../hooks/useAppPermissionsProvider";

import CustomButton from '../../components/CustomButton';
import ModalHeaderWithExitButton from './components/ModalHeaderWithExitButton';
import CustomModal from '../../components/CustomModal';

type ItemMyGalleryType = {
  id: number,
  uri: string,
  title: string,
  sizeImage?: string
}

type ItemProps = {
  modalVisible: boolean,
  setModalVisible: Function,
  setMyGallery: Function,
  myGallery: Array<ItemMyGalleryType>
};

export default function ModalScreen({modalVisible, setModalVisible, setMyGallery, myGallery}: ItemProps) {
  //States
  const [pictureTitle, setPictureTitle] = useState('')
  const [pictureURI, setPictureURI] = useState<string>('')
  const [pictureSize, setPictureSize] = useState({'height': 0, 'width': 0})
  const [isPictureSelected, setIsPictureSelected] = useState(false)
  const [isPictureTaken, setIsPictureTaken] = useState(false)
  const [numbersOfPictures, setNumberOfPictures] = useState<number>(myGallery.length)

  //Hooks
  const { control, watch, reset, } = useForm();
  const {
    isDataPermissionGranted,
    askDataPermissions,
    isCameraPermissionGranted,
    askCameraPermissions
  } = useAppPermissionsProvider();

  //Expected effects
  useEffect(()=>{
    watch((value) => setPictureTitle(value['title']));
  },[pictureTitle])

  useEffect(()=>{ getData(); }, []);
  useEffect(()=>{ storeData(); }, [numbersOfPictures]);

  const storeData = async () => {
    await AsyncStorage.setItem('numbersOfPictures', String(myGallery.length));
  }

  const getData = async () => {
    const data = await AsyncStorage.getItem('numbersOfPictures');
    setNumberOfPictures(Number(data))
  }

  const showMyGallery = async () => {
    if(pictureTitle.length > 0){
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1
      });

      if(!result.canceled){
        const uri:string = result.assets[0].uri;
        const height:number = result.assets[0].height
        const width:number = result.assets[0].width

        setPictureURI(uri)
        setPictureSize({'height': height, 'width': width})
        setIsPictureSelected(true)
      }
    } else {
      alert('Please add a title to your picture')
    }
  }

  const takeAPicture = async () => {
    if(pictureTitle.length > 0){
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1
      });

      if(!result.canceled){
        const uri:string = result.assets[0].uri;
        const height:number = result.assets[0].height
        const width:number = result.assets[0].width

        setPictureURI(uri)
        setPictureSize({'height': height, 'width': width})
        setIsPictureTaken(true)
      }
    } else {
      alert('Please add a title to your picture')
    }
  }

  const resetAll = () => {
    setModalVisible(false)
    setIsPictureSelected(false)
    setIsPictureTaken(false)
    setPictureURI('')
    reset({title: ''})
  }

  const ModalFooter = () => (
    <View style={styles.modalFooter}>
      <CustomButton text="Cancel" action={()=>resetAll()}/>
      {
        (isPictureSelected || isPictureTaken)
          && <CustomButton
            text="Add Picture"
            action={
              () => {
                setMyGallery((myGallery:object[]) => {
                    const res = [...myGallery, {'id': numbersOfPictures, 'title': pictureTitle, 'uri': pictureURI, 'size': pictureSize }];
                    setNumberOfPictures(res.length);

                    return res
                  }
                )
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
          <ModalHeaderWithExitButton title='Add a photo' action={() => resetAll()}/>
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
            isPictureSelected || isPictureTaken
            ? <AntDesign
                name="checkcircle"
                size={20}
                color='green'
                style={{textAlign:'center', justifyContent: 'space-between' }}
                children={
                  (isPictureSelected && <Text> A picture has been selected </Text> ) ||
                  (isPictureTaken && <Text> A picture has been taken </Text> )
                }
              />
            : <View>
                <CustomButton
                    text="Choose a picture"
                    action={
                      isDataPermissionGranted
                        ? () => showMyGallery()
                        : () => askDataPermissions()
                    }
                />
                <CustomButton
                  text='Take a picture'
                  action={
                    isCameraPermissionGranted
                      ? () => takeAPicture()
                      : () => askCameraPermissions()
                  }
                />
              </View>
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
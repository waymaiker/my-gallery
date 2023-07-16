import React from "react";
import { useEffect, useState } from "react";
import { FlatList, Pressable, SafeAreaView, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import { AndroidPermissionsProvider } from "../contexts/androidPermissionsProvider";
import usePhoneOrientationProvider from "../hooks/usePhoneOrientationProvider";

import ImageCard from "../components/ImageCard";
import ModalScreen from "./ModalScreen/ModalScreen";
import CardScreen from "./CardScreen";
import CustomButton from "../components/CustomButton";


type ItemMyGalleryProps = {
  id: number,
  uri: string,
  title: string
}

export default function HomeScreen() {
  //States
  const [visible, setVisible] = useState(false);
  const [showImageDetail, setShowImageDetail] = useState(false);
  const [imageDetail, setImageDetail] = useState({uri: '', title: ''});
  const [myGallery, setMyGallery] = useState<ItemMyGalleryProps[]>([])
  const [picturesCurrentlySelected, setSelectedPictures] = useState<number[]>([])

  //Hooks
  const { isPortrait, definePhoneOrientation } = usePhoneOrientationProvider()

  //Expected effects
  useEffect(()=>{ setSelectedPictures([]), getData(), definePhoneOrientation() },[])
  useEffect(()=>{ definePhoneOrientation() },[isPortrait])
  useEffect(()=>{ storeData() },[myGallery, picturesCurrentlySelected])

  const storeData = async () => {
    await AsyncStorage.setItem('myGallery', JSON.stringify(myGallery));
  }

  const getData = async () => {
    const data = await AsyncStorage.getItem('myGallery');
    data?.length ? setMyGallery(JSON.parse(data)) : setMyGallery([])
  }

  const selectAnItem = (id: number) => {
    if(!picturesCurrentlySelected.includes(id)){
      setSelectedPictures(picturesCurrentlySelected => [...picturesCurrentlySelected, id])
    } else {
      setSelectedPictures(picturesCurrentlySelected.filter(element => element != id))
    }
  }

  const pressAnItem = (uri: string, title: string) => {
    setImageDetail({uri, title})
    setShowImageDetail(true)
  }

  const AddPhotoButton = () => (
    <CustomButton
      withIcon="add"
      action={() => {
        setVisible(true)
        setSelectedPictures([])
      }}
    />
  )

  const DeletePhotoButton = () => (
    <CustomButton
      withIcon="trash"
      action={() => {
        const newGallery = myGallery.filter(element => !picturesCurrentlySelected.includes(element['id']))
        setMyGallery(newGallery)
        setSelectedPictures([])
      }}
    />
  )

  const UnSelectAllPhotosButton = () => (
    <CustomButton
      withIcon="cross"
      action={() => setSelectedPictures([])}
    />
  )

  const HeaderTitle = () => {
    return picturesCurrentlySelected.length > 0
      ? <View style={{ width: "45%", flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{fontWeight:'bold', fontSize:15 }}> Selected </Text>
          <Text style={{ backgroundColor:'grey', borderRadius: 20 }}> {picturesCurrentlySelected.length} </Text>
        </View>
      : <Text style={{fontWeight:'bold', fontSize:15 }}> My Portfolio </Text>
  }

  const EmptyGallery = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{fontSize: 20}}> Your gallery is currently empty </Text>
    </View>
  )

  const SelectableItem = ({id, uri, title}: ItemMyGalleryProps) => {
    return <Pressable
      onLongPress={() => selectAnItem(id)}
      onPress={() => pressAnItem(uri, title)}
      style={picturesCurrentlySelected.includes(id) ? { opacity: 0.5 } : {}}
    >
      <ImageCard
        key={id}
        uri={uri}
      />
    </Pressable>
  }

  return (
    <SafeAreaView style={{ flex: 1, alignItems:'center' }}>
      <Stack.Screen
        options={{
          headerTitleAlign: 'center',
          headerLeft: () => picturesCurrentlySelected.length > 0 && <UnSelectAllPhotosButton />,
          headerTitle: () => <HeaderTitle />,
          headerRight: () => <View style={{ flexDirection: 'row'}}>
           {picturesCurrentlySelected.length > 0 && <DeletePhotoButton /> }
           <AddPhotoButton />
          </View>,
        }}
      />
      <CardScreen
        title={imageDetail.title}
        uri={imageDetail.uri}
        showImageDetail={showImageDetail}
        setShowImageDetail={setShowImageDetail}
      />
      <AndroidPermissionsProvider>
        <ModalScreen
          modalVisible={visible}
          setModalVisible={setVisible}
          setMyGallery={setMyGallery}
        />
      </AndroidPermissionsProvider>
      {
        myGallery.length != 0
        ? <FlatList
            showsVerticalScrollIndicator={false}
            data={myGallery}
            numColumns={isPortrait ? 3 : 6}
            key={isPortrait ? 3 : 6}
            renderItem={({item}) => <SelectableItem id={item['id']} uri={item['uri']} title={item['title']} />}
          />
        : <EmptyGallery />
      }
    </SafeAreaView>
  );
}
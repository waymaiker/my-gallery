import React from "react";
import { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList, Pressable, SafeAreaView, Text, View } from "react-native";

import usePhoneOrientationProvider from "../../hooks/usePhoneOrientationProvider";

import ImageCard from "../../components/ImageCard";
import ModalScreen from "../ModalScreen/ModalScreen";
import HeaderGallery from "./components/HeaderGallery";

type ItemMyGalleryProps = {
  id: number,
  uri: string,
  title: string
}

type Nav = {
  navigate: (name: string, params: {}) => {}
}

export default function HomeScreen() {
  //States
  const [visible, setVisible] = useState(false);
  const [myGallery, setMyGallery] = useState<ItemMyGalleryProps[]>([])
  const [picturesCurrentlySelected, setSelectedPictures] = useState<number[]>([])

  //Hooks
  const { isPortrait } = usePhoneOrientationProvider()
  const navigation = useNavigation<Nav>()

  //Expected effects
  useEffect(()=>{ setSelectedPictures([]), getData() }, [])
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

  const EmptyGallery = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{fontSize: 20}}> Your gallery is currently empty </Text>
    </View>
  )

  const SelectableItem = ({id, uri, title}: ItemMyGalleryProps) => {
    return <Pressable
      onLongPress={() => selectAnItem(id)}
      onPress={() => navigation.navigate('CardScreen', { uri: uri, title: title } ) }
      style={picturesCurrentlySelected.includes(id) ? { opacity: 0.5 } : {}}
    >
      <ImageCard
        key={id}
        uri={uri}
      />
    </Pressable>
  }

  const ContentGallery = () => {
    return myGallery.length != 0
      ? <FlatList
          showsVerticalScrollIndicator={false}
          data={myGallery}
          numColumns={isPortrait ? 3 : 6}
          key={isPortrait ? 3 : 6}
          renderItem={({item}) =>
            <SelectableItem
              id={item['id']}
              uri={item['uri']}
              title={item['title']}
            />
          }
        />
      : <EmptyGallery />
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderGallery
        setSelectedPictures={() => setSelectedPictures([])}
        picturesCurrentlySelected={picturesCurrentlySelected}
        addPhoto={() => {
          setVisible(true)
          setSelectedPictures([])
        }}
        deletePhoto={() => {
          const newGallery = myGallery.filter(element => !picturesCurrentlySelected.includes(element['id']))
          setMyGallery(newGallery)
          setSelectedPictures([])
        }}
      />
      <ModalScreen
        modalVisible={visible}
        setModalVisible={setVisible}
        setMyGallery={setMyGallery}
      />
      <ContentGallery />
    </SafeAreaView>
  );
}
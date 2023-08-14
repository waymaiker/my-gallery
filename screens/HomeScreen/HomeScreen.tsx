import React from "react";
import * as Device from 'expo-device';
import { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { TabView, SceneMap } from 'react-native-tab-view';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import usePhoneOrientationProvider from "../../hooks/usePhoneOrientationProvider";

import { Icons } from "../../constants/constants";
import ImageCard from "../../components/ImageCard";
import ModalScreen from "../ModalScreen/ModalScreen";
import HeaderGallery from "./components/HeaderGallery";
import BottomGallery from "./components/BottomGallery";
import EmptyGallery from "./components/EmptyGallery";

type ItemMyGalleryProps = {
  id: number,
  uri: string,
  title: string,
  sizeImage?: string
}

type Nav = {
  navigate: (name: string, params: {}) => {}
}

export default function HomeScreen() {
  //States
  const [visible, setVisible] = useState(false);
  const [myGallery, setMyGallery] = useState<ItemMyGalleryProps[]>([])
  const [picturesCurrentlySelected, setSelectedPictures] = useState<number[]>([])
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ]);

  //Variables
  const layout = useWindowDimensions();
  const isMyGalleryEmpty = myGallery.length != 0;

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

  const addPhoto = () => {
    setVisible(true)
    setSelectedPictures([])
  }

  const SelectableItem = ({id, uri, title, sizeImage}: ItemMyGalleryProps) => {
    return <Pressable
      onLongPress={() => selectAnItem(id)}
      onPress={() => navigation.navigate('CardScreen', { id:id, uri: uri, title: title } ) }
      style={picturesCurrentlySelected.includes(id) ? { opacity: 0.5 } : {}}
    >
      <ImageCard
        id={id}
        uri={uri}
        sizeType={sizeImage}
      />
    </Pressable>
  }

  const ContentGridGallery = () => {
    return isMyGalleryEmpty
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

  const ContentGallery = () => {
    return isMyGalleryEmpty
      ? <FlatList
          key={0}
          showsVerticalScrollIndicator={false}
          data={myGallery}
          renderItem={({item}) =>
            <SelectableItem
              id={item['id']}
              uri={item['uri']}
              title={item['title']}
              sizeImage="medium"
            />
          }
        />
      : <EmptyGallery />
  }

  const renderTabBar = (props:any) => {
    const tabIcons = [
      Icons["grid"],
      Icons["square"]
    ];

    return  <View style={styles.tabBar}>
    {
      routes.map((route, i) => <TouchableOpacity
        key={i}
        onPress={() => setIndex(i)}
        style={[styles.tabItem, { borderBottomWidth: 2, borderBottomColor: index == i ? 'black' : 'white' }]}
        >
          {tabIcons[i]}
        </TouchableOpacity>
      )
    }
    </View>
  }

  const renderScene = SceneMap({
    first: ContentGridGallery,
    second: ContentGallery,
  });

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: Device.osName == 'android' ? StatusBar.currentHeight : 0 }}>
      <HeaderGallery
        setSelectedPictures={() => setSelectedPictures([])}
        picturesCurrentlySelected={picturesCurrentlySelected}
        addPhoto={addPhoto}
        deletePhoto={() => {
          const newGallery = myGallery.filter(element => !picturesCurrentlySelected.includes(element['id']))
          setMyGallery(newGallery)
          setSelectedPictures([])
        }}
      />
      <ModalScreen
        modalVisible={visible}
        myGallery={myGallery}
        setModalVisible={setVisible}
        setMyGallery={setMyGallery}
      />
      <TabView
        navigationState={{ index, routes }}
        renderTabBar={renderTabBar}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
      <BottomGallery addPhoto={addPhoto}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
  },
  tabItem: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: 'center',
    padding: 16,
  },
});
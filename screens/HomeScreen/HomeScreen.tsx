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

import { getDataFromLocalStorage, setDataIntoLocalStorage } from "../../services/localStorage";
import usePhoneOrientationProvider from "../../hooks/usePhoneOrientationProvider";

import { Icons } from "../../constants/constants";
import ImageCard from "../../components/ImageCard";
import ModalScreen from "../ModalScreen/ModalScreen";
import HeaderGallery from "./components/HeaderGallery";
import BottomGallery from "./components/BottomGallery";
import EmptyGallery from "./components/EmptyGallery";
import AlertDeletion from "./components/AlertDeletion";

type ItemMyGalleryProps = {
  id: number,
  uri: string,
  title: string,
  size: object,
  sizeImage?: string
}

type Nav = {
  navigate: (name: string, params: {}) => {}
}

export default function HomeScreen() {
  //States
  const [visible, setVisible] = useState(false);
  const [visibleAlertDeletion, setVisibleAlertDeletion] = useState(false);
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
  useEffect(()=>{ initMyGallery() }, [])
  useEffect(()=>{ setDataIntoLocalStorage('myGallery', myGallery) },[myGallery, picturesCurrentlySelected])

  const initMyGallery = async () => {
    setSelectedPictures([]);
    const res = await getDataFromLocalStorage('myGallery', [])
    setMyGallery(res);
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

  const resetSelectedPictures = () => {
    setVisibleAlertDeletion(false)
    setSelectedPictures([])
  }

  const SelectableItem = ({id, uri, title, sizeImage, size}: ItemMyGalleryProps) => {
    return <Pressable
      onLongPress={() => selectAnItem(id)}
      onPress={() => navigation.navigate('CardScreen', { id:id, uri: uri, title: title, size: size } ) }
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
      ? <View style={ isPortrait ? {} : {alignItems: 'center'}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={myGallery}
            numColumns={isPortrait ? 3 : 6}
            key={isPortrait ? 3 : 6}
            renderItem={({item}) =>
              <SelectableItem
                id={item['id']}
                uri={item['uri']}
                title={item['title']}
                size={item['size']}
                sizeImage={isPortrait ? "" : "small"}
              />
            }
          />
        </View>
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
              size={item['size']}
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
    <SafeAreaView style={{ flex: 1, paddingTop: Device.osName == 'Android' ? StatusBar.currentHeight : 0 }}>
      <HeaderGallery
        setSelectedPictures={() => setSelectedPictures([])}
        picturesCurrentlySelected={picturesCurrentlySelected}
        deletePhoto={() => setVisibleAlertDeletion(true)}
      />
     <AlertDeletion
        isVisible={visibleAlertDeletion}
        setVisibility={setVisibleAlertDeletion}
        resetSelectedPictures={resetSelectedPictures}
        deleteSelectedPictures={()=>{
          const newGallery = myGallery.filter(element => !picturesCurrentlySelected.includes(element['id']))
          setMyGallery(newGallery)
          resetSelectedPictures()
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
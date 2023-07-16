import { StyleSheet, View , Image } from "react-native";

type ItemProps = {
  uri: string,
  fullScreen?: boolean
};

export default function ImageCard({uri, fullScreen}: ItemProps) {
  const isNormalSize:boolean = fullScreen == undefined;
  const sizeType:object = isNormalSize
    ? { width: 100, height: 100 }
    : { width: "100%", height: "95%", aspectRatio: 1/2 };

  return (
    <View style={ isNormalSize ? styles.container : styles.containerFullSize }>
      <Image
        source={{uri: uri}}
        style={sizeType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 10,
  },
  containerFullSize:{
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});

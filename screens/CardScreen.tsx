import { Text, TouchableOpacity } from "react-native";
import CustomModal from "../components/CustomModal";
import ImageCard from "../components/ImageCard";

import usePhoneOrientationProvider from "../hooks/usePhoneOrientationProvider";

type CardScreenProps = {
  uri: string,
  title: string
  showImageDetail: boolean,
  setShowImageDetail: Function,
}


export default function CardScreen({title, uri, setShowImageDetail, showImageDetail}: CardScreenProps) {
  //Hooks
  const { isPortrait } = usePhoneOrientationProvider()

  const textStyle = { padding: isPortrait ? 1 : 15 }
  return (
     <CustomModal
      isVisible={showImageDetail}
      setVisibility={setShowImageDetail}
      children={
        <TouchableOpacity onPress={() => setShowImageDetail(false) } style={ !isPortrait && { flexDirection: 'row', alignItems: 'center', justifyContent: "center" }}>
          <ImageCard
            uri={uri}
            fullScreen={true}
          />
          <Text style={{ backgroundColor: "white" , textAlign: 'center', fontSize: 20, borderRadius: 10, ...textStyle}}>
            Name: {title}
          </Text>
        </TouchableOpacity>
      }
    />
  );
}
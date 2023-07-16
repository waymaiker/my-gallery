import { Modal, StyleSheet, View } from "react-native";

type Props = {
  children: any,
  isVisible: boolean,
  setVisibility: Function
}

export default function CustomModal({children, isVisible, setVisibility}: Props){
  return <Modal
    animationType="fade"
    transparent={true}
    visible={isVisible}
    onRequestClose={() => setVisibility(!isVisible)}
  >
    <View style={styles.container}>
      <View style={styles.modalView}>
        {children}
      </View>
    </View>
  </Modal>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    width: "80%",
    justifyContent: 'space-around',
    borderRadius: 10,
  },
});
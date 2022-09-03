import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  useWindowDimensions,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  Platform,
} from "react-native";
import React from "react";
import { COLORS, FONTFAMILY, height, IMAGES, SIZES, width } from "../constants";
import Swiper from "react-native-swiper";
import { Icon } from "native-base";
export default function CustomImageViewer({
  modalVisible,
  setModalVisible,
  data,
}) {
  const layout = useWindowDimensions();
  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={modalVisible}
      statusBarTranslucent
      style={{}}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <Swiper
          style={{}}
          width={layout.width}
          showsPagination={false}
          onIndexChanged={(index) => {
            if (index === 5) {
              setModalVisible(false);
            }
          }}
        >
          {data.map((item) => {
            return (
              <ImageBackground
                style={{
                  height: height,
                  // width: width,
                  marginHorizontal: SIZES.five,
                  // backgroundColor: "red",
                  // marginTop: SIZES.twenty,
                }}
                source={IMAGES.ImageParty}
                resizeMode={"contain"}
              />
            );
          })}
        </Swiper>
      </View>
      <TouchableOpacity
        style={{
          position: "absolute",
          right: SIZES.twenty,
          top: Platform.OS === "ios" ? SIZES.twenty * 4 : SIZES.twenty * 2,
          padding: SIZES.five,
          borderWidth: 1,
          borderColor: COLORS.white,
          borderRadius: SIZES.twenty * 2,
        }}
        onPress={() => setModalVisible(false)}
      >
        <Icon
          type={FONTFAMILY.AntDesign}
          name="close"
          style={{
            color: COLORS.white,
          }}
        />
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  modalView: {
    marginTop: SIZES.twenty,
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

const carouselItems = [
  {
    id: 1,
    title: "Item 1",
    text: "Text 1",
  },
];

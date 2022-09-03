import React from "react";
import { StyleSheet, Modal } from "react-native";
import LottieView from "lottie-react-native";
import { COLORS, IMAGES } from "../../constants";

export default function Loader(props) {
  return (
    <Modal
      statusBarTranslucent
      animationType="fade"
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
      visible={props.visibility}
      transparent={true}
    >
      <LottieView
        source={IMAGES.Loader}
        autoPlay
        loop
        style={{ backgroundColor: `${COLORS.black}25` }}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({});

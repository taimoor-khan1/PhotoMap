import { StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, STYLES } from "../constants";
import ImageView from "react-native-image-viewing";

export default function ImageViewer({ visible, setIsVisible, data }) {
  // const [images, setImages] = useState({});

  const images = [
    {
      uri:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJsHVBKWgfjymV62umFn7Jbdj-yvUDkeQoIg&usqp=CAU",
    },
    {
      uri:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJsHVBKWgfjymV62umFn7Jbdj-yvUDkeQoIg&usqp=CAU",
    },
    {
      uri:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxZELaMEefYf8gxdlZ7KKOKoWhMKFAM6EMJw&usqp=CAU",
    },
  ];

  return (
    <View>
      <ImageView
        images={data}
        imageIndex={0}
        visible={visible}
        presentationStyle={"fullScreen"}
        onRequestClose={() => {
          setIsVisible(false);
          // setTimeout(() => {
          //   StatusBar.setTranslucent(true);
          //   StatusBar.setBackgroundColor(COLORS.transparent);
          //   StatusBar.setBarStyle("light-content");
          // }, 300);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});

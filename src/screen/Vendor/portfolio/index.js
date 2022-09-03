import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import MasonryList from "@react-native-seoul/masonry-list";

import {
  FlatList,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  IMAGES,
  SIZES,
  STYLES,
  COLORS,
  FONTS,
  SCREENS,
} from "../../../constants/theme";

import NormalHeader from "../../../components/NormalHeader";
import MyTouchableOpacity from "../../../components/MyTouchableOpacity";
import BackArrow from "../../../components/BackArrow";
import ButtonRadius10 from "../../../components/ButtonRadius10";
import LinearGradient from "react-native-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";
import ImageViewer from "../../../components/ImageViewer";

export default function PortFolio(props) {
  const [showImageViewer, setShowImageViewer] = useState(false);
  const navigation = useNavigation();
  const renderFiltersItem = ({ item }) => {
    const randomHeight = useMemo(() => Math.random() < 0.5, []);
    return (
      <MyTouchableOpacity
        onPress={() => {
          setShowImageViewer(true);
        }}
        key={item.id}
        style={{
          height: randomHeight
            ? SIZES.fiftyWidth * 2.3
            : SIZES.fiftyWidth * 5.5,
          flex: 1,
          overflow: "hidden",
          margin: 5,
        }}
      >
        <ImageBackground
          source={{ uri: item.uri }}
          style={{
            flex: 1,
            // width: SIZES.fiftyWidth * 1.5,
            // justifyContent: "center",
            // alignItems: "center",
          }}
          imageStyle={{
            borderRadius: SIZES.fifteen,
          }}
        />
      </MyTouchableOpacity>
    );
  };
  return (
    <View style={[STYLES.container]}>
      {/* <StatusBar
        barStyle={'light-content'}
        translucent
        backgroundColor={COLORS.transparent}
      /> */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: SIZES.fifteen,
        }}
      >
        <BackArrow />
        <Text style={[FONTS.boldFont22]}>Portfolio</Text>
        <LinearGradient
          colors={[COLORS.primary1, COLORS.crimson]}
          style={{
            paddingHorizontal: SIZES.fifteen,
            paddingVertical: SIZES.five,
            borderRadius: SIZES.ten,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate(SCREENS.UploadFiles);
            }}
          >
            <Text
              style={[
                FONTS.mediumFont12,
                { color: COLORS.white, textAlign: "center" },
              ]}
            >
              Upload
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>

      <MasonryList
        // style={{ alignSelf: "stretch" }}
        contentContainerStyle={{
          // paddingHorizontal: 10,
          paddingBottom: 200,
          // alignSelf: 'stretch',
          marginTop: SIZES.twenty,
        }}
        numColumns={2}
        data={filters}
        renderItem={renderFiltersItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
      <ImageViewer
        visible={showImageViewer}
        setIsVisible={setShowImageViewer}
        data={filters}
      />
      {/* <CustomImageViewer
        modalVisible={showImageViewer}
        setModalVisible={setShowImageViewer}
        data={filters}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({});

const ReviewData = [
  {
    id: 1,
    name: "Mrs.  Jennifer John",
    number: "1 min ago",
    dec:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.",
  },
  {
    id: 2,
    name: "Mrs.  Jennifer John",
    number: "1 min ago",
    dec:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.",
  },
  {
    id: 3,
    name: "Mrs.  Jennifer John",
    number: "1 min ago",
    dec:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.",
  },
  {
    id: 4,
    name: "Mrs.  Jennifer John",
    number: "1 min ago",
    dec:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.",
  },
  {
    id: 5,
    name: "Mrs.  Jennifer John",
    number: "1 min ago",
    dec:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.",
  },
  {
    id: 6,
    name: "Mrs.  Jennifer John",
    number: "1 min ago",
    dec:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.",
  },
  {
    id: 7,
    name: "Mrs.  Jennifer John",
    number: "1 min ago",
    dec:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.",
  },
  {
    id: 8,
    name: "Mrs.  Jennifer John",
    number: "1 min ago",
    dec:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.",
  },
];

const filters = [
  {
    id: "1",
    name: "Cinematic",
    uri:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxZELaMEefYf8gxdlZ7KKOKoWhMKFAM6EMJw&usqp=CAU",
  },
  {
    id: "2",
    name: "Glitch",
    uri:
      "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  },
  {
    id: "3",
    name: "Neon",
    uri:
      "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  },
  {
    id: "4",
    name: "Cinematic",
    uri:
      "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  },

  {
    id: "5",
    name: "Neon",
    uri:
      "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  },
  {
    id: "6",
    name: "Cinematic",
    uri:
      "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  },
];

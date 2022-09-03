import React, { useEffect, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  LogBox,
} from "react-native";
import ImagePicker from "react-native-image-crop-picker";

import {
  SIZES,
  FONTS,
  FONTFAMILY,
  IMAGES,
  COLORS,
  STYLES,
  CONSTANTS,
  SCREENS,
} from "../../constants/theme";
import BackArrow from "../../components/BackArrow";
import ButtonRadius10 from "../../components/ButtonRadius10";
import { Icon } from "native-base";
import LinearGradient from "react-native-linear-gradient";
import { CommonActions } from "@react-navigation/native";

export default function UploadFiles(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  //======================= Image Picker From Gallery Methood ================================//
  const choosePhotoFromGallery = () => {
    let temp = [];
    ImagePicker.openPicker({
      width: SIZES.ten * 40,
      height: SIZES.ten * 40,
      cropping: true,
      multiple: true,
      // includeBase64: true,   //this will convert image to base64
      // includeExif: true,  //this will show  specific information related to image
    })
      .then((responce) => {
        // console.log('Responce ===================== ', responce);
        responce.map((img) => {
          temp.push(img);
        });

        setImages(temp);
      })
      .catch((error) => {
        // console.log('error================== ', error);
      });
  };

  const remove = (imagepath) => {
    let tempimages = images.filter((item) => item.path !== imagepath);

    setImages(tempimages);
  };

  const formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
    while (
      numberOfElementsLastRow !== numColumns &&
      numberOfElementsLastRow !== 0
    ) {
      data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
      numberOfElementsLastRow++;
    }

    return data;
  };

  return (
    <View style={[STYLES.container, { paddingHorizontal: SIZES.fifteen }]}>
      {/* <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} /> */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <BackArrow />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            props.navigation.dispatch(
              CommonActions.reset({
                routes: [
                  {
                    name: SCREENS.DrawerNavigator,
                    params: { userType: "vendor" },
                  },
                ],
              })
            );
          }}
        >
          <LinearGradient
            colors={[COLORS.primary1, COLORS.crimson]}
            style={{
              paddingHorizontal: SIZES.twenty,
              paddingVertical: SIZES.five,
              borderRadius: SIZES.ten,
            }}
          >
            <Text style={[FONTS.mediumFont14, { color: COLORS.white }]}>
              Save
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      {/* ======================== HEADER HERE ======================== */}
      <View
        style={{
          justifyContent: "center",
        }}
      >
        <Text
          style={[
            FONTS.mediumFont18,
            { color: COLORS.BLACK, textAlign: "center" },
          ]}
        >
          Starting from
        </Text>
        <Image
          source={IMAGES.LogoPhotoMap}
          resizeMode="contain"
          style={{
            height: SIZES.twentyFive * 3,
            width: SIZES.twentyFive * 8.5,
            alignSelf: "center",
          }}
        />

        <Text
          style={[
            FONTS.mediumFont14,
            { color: COLORS.brownGrey, textAlign: "center" },
          ]}
        >
          Duis aute irure dolor in reprehenderit{"\n"}in voluptate
        </Text>
      </View>
      {/* ======================== HEADER END======================== */}

      <ScrollView
        contentContainerStyle={{
          // justifyContent: 'space-between',
          paddingBottom: SIZES.twenty,
          marginTop: SIZES.five,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text style={[FONTS.mediumFont16, { color: COLORS.BLACK }]}>
            {title}
          </Text>
          <Text style={[FONTS.mediumFont12, { color: COLORS.brownGrey }]}>
            {description}
          </Text>
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: SIZES.twenty * 2,
            borderWidth: 2,
            borderColor: COLORS.crimson,
            borderStyle: "dashed",
            borderRadius: SIZES.ten,
          }}
        >
          <Text style={[FONTS.mediumFont14, { color: COLORS.brownGrey }]}>
            Drop Files Here
          </Text>
          <ButtonRadius10
            label={"Select Files"}
            style={{ width: "50%", marginTop: SIZES.twenty }}
            onPress={() => {
              choosePhotoFromGallery();
            }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <FlatList
            data={formatData(images, 3)}
            keyExtractor={(_, index) => index.toString()}
            numColumns={3}
            key={"LANDSCAPE"}
            renderItem={({ item }) => {
              // console.log('item++++++++++', item);
              if (item.empty === true) {
                return <View style={[styles.item, styles.itemInvisible]} />;
              }
              return (
                <View
                  style={{
                    flex: 1,
                    marginTop: SIZES.ten,
                    flex: 1,
                  }}
                >
                  <ImageBackground
                    source={{ uri: item.path }}
                    style={{
                      height: SIZES.twenty * 7.5,
                      flex: 1,
                      marginLeft: SIZES.ten,
                      alignItems: "flex-end",
                    }}
                    imageStyle={{ borderRadius: SIZES.ten }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        remove(item.path);
                      }}
                      style={{
                        backgroundColor: COLORS.blackWithOpacity,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: SIZES.twenty,
                        padding: SIZES.five / 2,
                        margin: SIZES.five,
                      }}
                    >
                      <Icon
                        type={FONTFAMILY.AntDesign}
                        name={"close"}
                        style={{
                          color: COLORS.white,
                          fontSize: SIZES.twenty,
                        }}
                      />
                    </TouchableOpacity>
                  </ImageBackground>
                </View>
              );
            }}
            style={{ flex: 1, marginTop: SIZES.twenty }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#4D243D",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 1,
    height: Dimensions.get("window").width / 3, // approximate a square
  },
  itemInvisible: {
    backgroundColor: "transparent",
  },
});

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  FlatList,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Animated,
  Modal,
} from "react-native";
import {
  IMAGES,
  SIZES,
  STYLES,
  COLORS,
  FONTS,
  FONTFAMILY,
  width,
  CONSTANTS,
} from "../../../constants/theme";
import { getStatusBarHeight } from "react-native-status-bar-height";
import BackArrow from "../../../components/BackArrow";
import { Icon } from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";
import UserImageWithCrown from "../../../components/UserImageWithCrown";
import { useFocusEffect } from "@react-navigation/core";
import { SharedElement } from "react-navigation-shared-element";
import CustomImageViewer from "../../../components/CustomImageViewe";

export default function PortFolio(props) {
  const { params } = props.route;

  const opacity = useRef(new Animated.Value(0)).current;
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [Image, setImage] = useState([
    {
      uri:
        "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
  ]);

  if (params !== undefined) {
    // console.log('OOOOOOOOOOOO===============>>>>>>>>>', params.params.item);
  }
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle("light-content");
      Platform.OS === "android" && StatusBar.setBackgroundColor("transparent");
      StatusBar.setTranslucent(true);

      Animated.timing(opacity, {
        toValue: 1,
        duration: 250,
        delay: 500,
        useNativeDriver: true,
      }).start();
    }, [])
  );

  const RendorReview = ({ item }) => {
    return (
      <View
        style={{
          borderWidth: 1,
          borderColor: COLORS.brownGrey,
          borderRadius: SIZES.ten,
          padding: SIZES.fifteen,
          marginHorizontal: SIZES.fifteen,
          marginBottom: SIZES.fifteen,
          backgroundColor: COLORS.white,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <UserImageWithCrown />
          <View style={{ marginHorizontal: SIZES.ten }}>
            <Text style={[FONTS.mediumFont14, { color: COLORS.black }]}>
              {item.name}
            </Text>
            <Text style={[FONTS.lightFont12, { color: COLORS.brownGrey }]}>
              {item.number}
            </Text>
          </View>
        </View>

        <Text
          style={[
            FONTS.mediumFont14,
            { color: COLORS.brownGrey, marginTop: SIZES.ten },
          ]}
        >
          {item.dec}
        </Text>
        <View style={{ flexDirection: "row" }}></View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.paleGrey }}>
      {/* <StatusBar
        barStyle={'light-content'}
        translucent
        backgroundColor={COLORS.transparent}
      /> */}

      {/** Image Background and User Data View start**/}
      <View
        style={[
          STYLES.shadow,
          {
            backgroundColor: COLORS.white,
            borderBottomRightRadius: SIZES.twenty,
            borderBottomLeftRadius: SIZES.twenty,
            paddingBottom: SIZES.ten,
          },
        ]}
      >
        {/** Image Background  start**/}
        {/* id={item.id} */}
        {params !== undefined && (
          <SharedElement id={params.item.id}>
            <ImageBackground
              imageStyle={{
                borderBottomRightRadius: SIZES.twenty,
                borderBottomLeftRadius: SIZES.twenty,
              }}
              style={[
                {
                  height: SIZES.twenty * 16,
                  width: width,
                },
              ]}
              source={{
                uri:
                  CONSTANTS.API_CALLS.IMAGE_URL +
                  "/public/" +
                  params.item?.portfolio?.image,
              }}
              // resizeMode={'cover'}
            >
              {/** Back Arrow user to handle back Arrow margin Top start**/}
              <View
                style={{
                  paddingTop:
                    Platform.OS === "android"
                      ? SIZES.twenty * 2
                      : getStatusBarHeight(true),
                  paddingHorizontal: SIZES.fifteen,
                }}
              >
                <BackArrow isBright />
              </View>

              {/** Back Arrow user to handle back Arrow margin Top start**/}

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: SIZES.twenty * 8,
                  justifyContent: "space-between",
                  paddingHorizontal: SIZES.fifteen,
                }}
              >
                <Text style={[FONTS.mediumFont18, { color: COLORS.white }]}>
                  Duis aute irure dolor in reprehenderi
                </Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    setShowImageViewer(true);
                    // setTimeout(() => {
                    //   // StatusBar.setBarStyle("light-content");
                    //   StatusBar.setBackgroundColor(COLORS.black);
                    // }, 300);
                  }}
                >
                  <Icon
                    type={FONTFAMILY.Ionicons}
                    name={"md-expand-outline"}
                    style={{ color: COLORS.white }}
                  />
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </SharedElement>
        )}
        {/** Image Background  end**/}

        {/** User Profile Data view  start**/}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: SIZES.fifteen,
            justifyContent: "space-between",
            paddingHorizontal: SIZES.fifteen,
          }}
        >
          <UserImageWithCrown style={{}} />
          <View>
            <Text style={[FONTS.mediumFont14]}>Mrs. Jennifer John</Text>
            <Text style={[FONTS.mediumFont12, { color: COLORS.brownGrey }]}>
              Party photoshot inspiration
            </Text>
            <Text
              style={[
                FONTS.lightFont12,
                { marginTop: SIZES.five, color: COLORS.red },
              ]}
            >
              New York, USA
            </Text>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: COLORS.darkSlateBlue,
              height: SIZES.fifty - SIZES.ten,
              width: SIZES.fifty - SIZES.ten,
              borderRadius: SIZES.ten,
              alignItems: "center",
              justifyContent: "center",
            }}
            activeOpacity={0.7}
          >
            <Icon
              type={FONTFAMILY.Ionicons}
              name={"md-person-add-outline"}
              style={{ color: COLORS.white, fontSize: SIZES.twenty * 1.2 }}
            />
          </TouchableOpacity>
        </View>

        {/** User Profile Data view end**/}
      </View>
      {/** Image Background and User Data View start**/}
      <Text
        style={[
          FONTS.mediumFont14,
          { marginVertical: SIZES.fifteen, paddingLeft: SIZES.fifteen },
        ]}
      >
        15 Reviews
      </Text>

      <View style={{ flex: 1 }}>
        <FlatList
          data={ReviewData}
          keyExtractor={(Item) => Item.id.toString()}
          renderItem={RendorReview}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* <ImageViewer
        visible={showImageViewer}
        setIsVisible={setShowImageViewer}
        data={Image}
      /> */}

      <CustomImageViewer
        modalVisible={showImageViewer}
        setModalVisible={setShowImageViewer}
        data={ReviewData}
      />
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
];

import React, { useMemo, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ImageBackground,
  FlatList,
  ScrollView,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import MasonryList from "@react-native-seoul/masonry-list";
import {
  COLORS,
  CONSTANTS,
  FONTFAMILY,
  FONTS,
  IMAGES,
  SCREENS,
  SIZES,
  STYLES,
} from "../../../constants";
import UserImageWithCrown from "../../../components/UserImageWithCrown";
import Card from "../../../components/Card";
import Row from "../../../components/Row";
import { Icon } from "native-base";
import MyTouchableOpacity from "../../../components/MyTouchableOpacity";
import DatePicker from "react-native-date-picker";
import moment, { min } from "moment";
import LinearGradient from "react-native-linear-gradient";
import { SharedElement } from "react-navigation-shared-element";
import { useNavigation } from "@react-navigation/core";
import ProfileHeader from "./../../../components/ProfileHeader";
import ImageViewer from "../../../components/ImageViewer";
import CustomImageViewer from "../../../components/CustomImageViewe";
import Loader from "../../../components/modals/Loader";

import { useDispatch, useSelector } from "react-redux";
import { GetVendorprofile } from "../../../redux/Silices/Profile";

export default function PhotographerProfile() {
  const dispatcher = useDispatch();

  const [showImageViewer, setShowImageViewer] = useState(false);
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getProfile();
  }, []);

  const [Profile, setProfile] = useState([]);

  const getProfile = async () => {
    await dispatcher(GetVendorprofile(""))
      .unwrap()
      .then((resp) => {
        setProfile(resp.data);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
      });
  };

  const renderFiltersItem = ({ item }) => {
    const randomHeight = useMemo(() => Math.random() < 0.5, []);
    return (
      <SharedElement id={item.id}>
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
            source={{
              uri: CONSTANTS.API_CALLS.IMAGE_URL + /public/ + item?.image,
            }}
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
      </SharedElement>
    );
  };
  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color={COLORS.primary1} />
      </View>
    );
  }
  return (
    <View style={[STYLES.container]}>
      <ProfileHeader
        title={"Mrs. " + Profile?.users[0]?.name}
        onEditeIconPressed={() => {
          navigation.navigate(SCREENS.VendorEditProfile);
        }}
      />

      <ScrollView
        style={{ marginTop: SIZES.ten }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={{ flex: 1, paddingHorizontal: SIZES.fifteen }}>
          <Card
            style={{
              backgroundColor: COLORS.secondary,
              marginTop: SIZES.twentyFive * 2,
              borderRadius: SIZES.ten,
            }}
          >
            <UserImageWithCrown
              image={CONSTANTS.API_CALLS.IMAGE_URL + Profile?.users[0]?.image}
              style={{
                alignSelf: "center",
                marginTop: -SIZES.twentyFive * 1.5,
              }}
            />
            <Row
              style={{
                justifyContent: "space-between",
                marginVertical: SIZES.fifteen,
                paddingHorizontal: SIZES.fifteen,
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Text
                  style={[
                    FONTS.mediumFont14,
                    { color: COLORS.brownGrey, marginBottom: SIZES.ten },
                  ]}
                >
                  Followers
                </Text>
                <Text style={[FONTS.boldFont20, { color: COLORS.black }]}>
                  {Profile?.followers_count}
                </Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text
                  style={[
                    FONTS.mediumFont14,
                    { color: COLORS.brownGrey, marginBottom: SIZES.ten },
                  ]}
                >
                  Projects
                </Text>
                <Text style={[FONTS.boldFont20, { color: COLORS.black }]}>
                  {Profile?.projects}
                </Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text
                  style={[
                    FONTS.mediumFont14,
                    { color: COLORS.brownGrey, marginBottom: SIZES.ten },
                  ]}
                >
                  Ratings
                </Text>
                <Text style={[FONTS.boldFont20, { color: COLORS.black }]}>
                  5.0
                </Text>
              </View>
            </Row>

            <View
              style={{
                backgroundColor: COLORS.paleGrey,
                borderRadius: SIZES.ten,
                marginVertical: SIZES.fifteen,
                paddingHorizontal: SIZES.five,
                marginHorizontal: SIZES.ten,
              }}
            >
              <Row
                style={{
                  marginVertical: SIZES.ten,
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text
                    style={[FONTS.mediumFont12, { color: COLORS.brownGrey }]}
                  >
                    Starting from
                  </Text>
                  <Text
                    style={[
                      FONTS.boldFont20,
                      { color: COLORS.black, marginVertical: SIZES.ten },
                    ]}
                  >
                    ${Profile?.users[0]?.price}
                  </Text>
                </View>
                <View style={{ marginHorizontal: SIZES.twenty }}>
                  <Text
                    style={[FONTS.mediumFont12, { color: COLORS.brownGrey }]}
                  >
                    Address
                  </Text>
                  <Text
                    style={[
                      FONTS.boldFont16,
                      { color: COLORS.black, marginVertical: SIZES.ten },
                    ]}
                  >
                    {Profile?.users[0]?.address}
                  </Text>
                </View>
                {/* <View
                  style={{
                    height: "100%",
                    width: 0.75,
                    backgroundColor: COLORS.brownGrey,
                    marginHorizontal: SIZES.fifteen,
                  }}
                />

                <View style={{ flex: 1 }}>
                  <Text
                    style={[FONTS.mediumFont12, { color: COLORS.brownGrey }]}
                  >
                    Recent Projects
                  </Text>
                  <Row
                    style={{
                      marginTop: SIZES.ten,
                      justifyContent: "space-between",
                    }}
                  >
                    <ImageBackground
                      source={IMAGES.ImageParty}
                      style={{
                        height: SIZES.fiftyWidth * 1.1,
                        width: SIZES.fiftyWidth * 1.1,
                      }}
                      imageStyle={{
                        borderRadius: SIZES.fifteen,
                      }}
                    />
                    <ImageBackground
                      source={IMAGES.ImageParty}
                      style={{
                        height: SIZES.fiftyWidth * 1.1,
                        width: SIZES.fiftyWidth * 1.1,
                      }}
                      imageStyle={{
                        borderRadius: SIZES.fifteen,
                      }}
                    />
                    <ImageBackground
                      source={IMAGES.ImageParty}
                      style={{
                        height: SIZES.fiftyWidth * 1.1,
                        width: SIZES.fiftyWidth * 1.1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      imageStyle={{
                        borderRadius: SIZES.fifteen,
                      }}
                      blurRadius={5}
                    >
                      <Text
                        style={[FONTS.lightFont14, { color: COLORS.white }]}
                      >
                        +337
                      </Text>
                    </ImageBackground>
                  </Row>
                </View> */}
              </Row>
            </View>
            <Row
              style={{
                justifyContent: "space-between",
                marginHorizontal: SIZES.fifteen,
              }}
            >
              <Text style={[FONTS.boldFont20, { color: COLORS.black }]}>
                About Me
              </Text>

              <MyTouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
                onPress={() => {
                  navigation.navigate(SCREENS.AllReviews, { item: Profile });
                }}
              >
                <Text style={[FONTS.mediumFont12, { color: COLORS.red }]}>
                  View All Reviews
                </Text>
                <Icon
                  type={FONTFAMILY.Entypo}
                  name={"chevron-right"}
                  style={{ fontSize: SIZES.twenty - 3, color: COLORS.red }}
                />
              </MyTouchableOpacity>
            </Row>
            <Text
              style={[
                FONTS.mediumFont12,
                {
                  color: COLORS.brownGrey,
                  marginHorizontal: SIZES.fifteen,
                  marginTop: SIZES.ten,
                  marginBottom: SIZES.fifteen,
                },
              ]}
            >
              {Profile?.users[0]?.about_me}
            </Text>
          </Card>

          <View
            style={{
              flex: 1,
              marginHorizontal: SIZES.fifteen,
              marginVertical: SIZES.twenty,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={[FONTS.boldFont20, { color: COLORS.black }]}>
                Portfolio
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              {/* {Profile.length !== 0 && (
                <MasonryList
                  contentContainerStyle={{
                    paddingBottom: 200,
                  }}
                  numColumns={2}
                  data={Profile?.users[0]?.portfolio}
                  renderItem={renderFiltersItem}
                  keyExtractor={(item) => item.id}
                  showsVerticalScrollIndicator={false}
                />
              )} */}
            </View>
          </View>
        </View>
      </ScrollView>

      <ImageViewer
        visible={showImageViewer}
        setIsVisible={setShowImageViewer}
        data={filters}
      />

      <Loader visibility={isLoading} />
    </View>
  );
}

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
    name: "Glitch",
    uri:
      "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  },
  {
    id: "6",
    name: "Neon",
    uri:
      "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  },
  {
    id: "7",
    name: "Cinematic",
    uri:
      "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  },
];

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
    backgroundColor: COLORS.blackWithOpacity,
  },
  modalView: {
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: SIZES.ten,
    padding: SIZES.ten,
    // justifyContent: 'center',
  },
});

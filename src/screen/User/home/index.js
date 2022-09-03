import React, { useState, useCallback, useRef, useEffect } from "react";
import { Icon } from "native-base";
import {
  FlatList,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
} from "react-native";
import { RadioButton } from "react-native-paper";
import Modal from "react-native-modal";
import Slider from "@react-native-community/slider";
import CircularImage from "../../../components/CircularImage";
import MyTouchableOpacity from "../../../components/MyTouchableOpacity";
import {
  COLORS,
  FONTFAMILY,
  IMAGES,
  SIZES,
  STYLES,
  FONTS,
  SCREENS,
  CONSTANTS,
} from "../../../constants";
import Row from "../../../components/Row";
import SearchBar from "../../../components/SearchBar";
import NearbyItem from "../../../components/NearbyItem";
import ButtonRadius10 from "../../../components/ButtonRadius10";
import { useFocusEffect } from "@react-navigation/core";
import UserImageWithCrown from "../../../components/UserImageWithCrown";
import Card from "../../../components/Card";
import { useNavigation } from "@react-navigation/native";
import { SharedElement } from "react-navigation-shared-element";

import * as FilterSearchAction from "../../../store/Action/SearchAction";

// ==================redux=================
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const navigation = useNavigation();
  const dispatcher = useDispatch();

  const Category = useSelector((state) => state.Category.data);
  const USERDATA = useSelector((state) => state.Profile.data);
  const [categories, setCategories] = useState(Category);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [value, setValue] = useState();

  const NEAR_BY_PHOTOGRAPHERS = useSelector(
    (state) => state.Photographers.data
  );

  React.useEffect(() => {
    setCategories(Category);
  }, [Category]);

  // console.log(NEAR_BY_PHOTOGRAPHERS);

  const scrollx = useRef(new Animated.Value(0)).current;

  // const SEARCHLOCATION = useSelector(
  //   (state) => state.SearchReducer.Searchlocation
  // );
  // const SHOWBOTTOMSHEET = useSelector(
  //   (state) => state.SearchReducer.ShowBottomSheet
  // );

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle("dark-content");
      Platform.OS === "android" && StatusBar.setBackgroundColor("transparent");
    }, [])
  );
  // const renderCategoryTitle = (item) => {
  //   var title = "";
  //   for (let i = 0; i < CATEGORIES.length; i++) {
  //     if (item?.vendor_category[0]?.category_id == CATEGORIES[i].id) {
  //       title = CATEGORIES[i].title;
  //     }
  //   }
  //   return title;
  // };
  const rendorNearBy = ({ item }) => {
    return (
      <MyTouchableOpacity
        onPress={() => {
          navigation.navigate(SCREENS.PhotographerProfile, {
            vendorID: item.id,
          });
        }}
      >
        <Card
          style={{
            backgroundColor: COLORS.paleGrey,
            paddingVertical: SIZES.ten,
            margin: SIZES.fifteen,
            borderRadius: SIZES.fifteen,
          }}
        >
          <Row
            style={{ marginHorizontal: SIZES.fifteen, alignItems: "center" }}
          >
            <UserImageWithCrown
              style={{}}
              image={CONSTANTS.API_CALLS.IMAGE_URL + item?.image}
            />
            <Text
              style={[
                FONTS.mediumFont12,
                { flex: 1, color: COLORS.black, marginHorizontal: SIZES.ten },
              ]}
            >
              {item?.name}
            </Text>

            <Row>
              <Image
                source={IMAGES.IconStarRed}
                style={{
                  height: SIZES.twentyWidth * 0.9,
                  width: SIZES.twentyWidth * 0.9,
                }}
              />
              <Text
                style={[
                  FONTS.lightFont12,
                  { color: COLORS.brownGrey, marginLeft: SIZES.five },
                ]}
              >
                {item.ratings}
              </Text>
            </Row>
          </Row>

          <Row
            style={{
              backgroundColor: COLORS.white,
              borderRadius: SIZES.fifteen,
              marginTop: SIZES.ten,
              paddingVertical: SIZES.ten,
            }}
          >
            <View
              style={{
                flex: 0.3,
                justifyContent: "space-evenly",
              }}
            >
              <View
                style={{
                  backgroundColor: "#ffe2e8",
                  alignItems: "center",
                  paddingVertical: SIZES.five / 2,
                  borderTopRightRadius: SIZES.ten,
                  borderBottomRightRadius: SIZES.ten,
                }}
              >
                <Text style={[FONTS.mediumFont10, { color: COLORS.primary1 }]}>
                  {/* {renderCategoryTitle(item)} */}
                  {item?.category_name[0]?.title}
                </Text>
              </View>
              <View
                style={{
                  marginHorizontal: SIZES.ten * 0.7,
                  alignItems: "center",
                }}
              >
                <Text
                  numberOfLines={3}
                  style={[
                    FONTS.mediumFont10,
                    { color: COLORS.black, textAlign: "center" },
                  ]}
                >
                  Party Photoshop Inspiration
                </Text>
                <Text style={[FONTS.lightFont10, { color: COLORS.brownGrey }]}>
                  {item?.portfolio[0]?.created_at}
                </Text>
                <Text
                  style={[
                    FONTS.lightFont08,
                    {
                      color: COLORS.primary1,
                      marginTop: SIZES.twenty,
                      textAlign: "center",
                    },
                  ]}
                >
                  {item?.address}
                </Text>
              </View>
            </View>
            <ImageBackground
              resizeMode={"cover"}
              source={{
                uri:
                  CONSTANTS.API_CALLS.IMAGE_URL +
                  /public/ +
                  item?.portfolio[0]?.image,
              }}
              style={{
                height: SIZES.fiftyWidth * 3.8,
                flex: 1,
                marginHorizontal: SIZES.five,
              }}
              imageStyle={{
                borderRadius: SIZES.fifteen,
              }}
            >
              <Row
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.45)",
                  paddingHorizontal: SIZES.ten,
                  alignSelf: "baseline",
                  position: "absolute",
                  bottom: SIZES.ten,
                  alignItems: "center",
                  right: SIZES.ten,
                  borderRadius: SIZES.twenty,
                }}
              >
                <Text style={[FONTS.lightFont08, { color: COLORS.white }]}>
                  12k
                </Text>
                <Icon
                  name={"ios-bookmark-outline"}
                  type={FONTFAMILY.Ionicons}
                  style={{
                    color: COLORS.white,
                    fontSize: SIZES.twentyWidth * 0.6,
                    marginLeft: SIZES.five,
                  }}
                />
              </Row>
            </ImageBackground>
          </Row>
        </Card>
      </MyTouchableOpacity>
    );
  };

  const rendorCategory = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginRight: SIZES.ten,
          marginTop: SIZES.ten,
        }}
        onPress={() => {
          setValue(item.id);
        }}
      >
        <Icon
          name={
            value == item.id ? "radio-button-on" : "radio-button-off-outline"
          }
          type={FONTFAMILY.Ionicons}
          style={{ fontSize: SIZES.twenty, color: COLORS.crimson }}
        />

        <Text style={[FONTS.mediumFont14, { marginStart: SIZES.five - 3 }]}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={[STYLES.container]}>
      {/* <StatusBar backgroundColor={COLORS.secondary} barStyle={'dark-content'} /> */}

      <Row
        style={{
          marginHorizontal: SIZES.fifteen,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularImage
          image={{
            uri: CONSTANTS.API_CALLS.IMAGE_URL + USERDATA?.records?.image,
          }}
          style={{ position: "absolute", left: 0 }}
        />
        <Image
          source={IMAGES.LogoPhotoMap}
          resizeMode={"contain"}
          style={{ height: SIZES.twentyFiveWidth * 1.25 }}
        />
      </Row>

      <SearchBar
        style={{
          marginTop: SIZES.twentyFive * 2,
        }}
        editable={false}
        filterSearch
        onFilterPress={async () => {
          await dispatcher(FilterSearchAction.setShowFilterBottomSheet(true));
        }}
        onPress={() => {
          navigation.navigate(SCREENS.Search);
          // alert("aaaaaaa");
        }}
      />

      {/* Event Horizantal List Start */}
      <View>
        <Animated.ScrollView
          horizontal
          contentContainerStyle={{
            padding: SIZES.twentyFive,
          }}
          showsHorizontalScrollIndicator={false}
          snapToInterval={SIZES.fiftyWidth * 1.76}
          scrollEventThrottle={16}
          decelerationRate={0}
          snapToAlignment="center"
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollx } } }],
            { useNativeDriver: true }
          )}
        >
          {categories?.map((item, index) => {
            const inputRange = [
              (index - 1.8) * SIZES.fifty * 1.7,
              index * SIZES.fifty * 1.7,
              (index + 1.3) * SIZES.fifty * 1.7,
            ];

            const scale = scrollx.interpolate({
              inputRange,
              outputRange: [0.9, 1.1, 0.9],
            });

            return (
              <MyTouchableOpacity
                key={item?.id}
                activeOpacity={0.7}
                // onPressIn={() => {
                //   let temp = [];
                //   categories?.map((e, i) => {
                //     if (i === index) {
                //       e.status = "1";
                //     }
                //     temp.push(e);
                //   });
                //   setCategories(temp);
                // }}
                // onPressOut={() => {
                //   let temp = [];
                //   categories?.map((e, i) => {
                //     e.status = "0";
                //     temp.push(e);
                //   });
                //   setCategories(temp);
                // }}
                style={[
                  styles.listItem,
                  {
                    // backgroundColor: item?.status
                    //   ? COLORS.primary1
                    //   : COLORS.white,
                    backgroundColor: COLORS.white,
                    transform: [{ scale }],
                  },
                ]}
                onPress={() => {
                  navigation.navigate(SCREENS.Nearby, {
                    id: item?.id,
                    Heading: item?.title,
                  });
                }}
              >
                <Animated.Image
                  source={{
                    uri: CONSTANTS.API_CALLS.IMAGE_URL + /public/ + item?.image,
                  }}
                  resizeMode={"contain"}
                  style={{
                    height: SIZES.twentyFiveWidth * 1.5,
                    width: SIZES.twentyFiveWidth * 1.5,
                    tintColor: COLORS.black,
                    // tintColor:item?.status === "0" ? COLORS.white : COLORS.black,
                    transform: [{ scale }],
                  }}
                />
                <Animated.Text
                  style={[
                    FONTS.mediumFont12,
                    {
                      // color: item.status ? COLORS.white : COLORS.black,
                      color: COLORS.black,
                      transform: [{ scale }],
                    },
                  ]}
                >
                  {item.title}
                </Animated.Text>
              </MyTouchableOpacity>
            );
          })}
        </Animated.ScrollView>
      </View>
      {/* Event Horizantal List End */}

      {/* Near By Flatlist View Start */}
      <View
        style={{
          flex: 1,
          // marginTop: SIZES.twenty * 1.5,
        }}
      >
        <Row
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: SIZES.fifteen,
          }}
        >
          <Text style={[FONTS.boldFont20, {}]}>Photographers</Text>
          <MyTouchableOpacity
            onPress={() => {
              navigation.navigate(SCREENS.Nearby, {
                Heading: "Photographers",
              });
            }}
          >
            <Text
              style={[
                FONTS.lightFont10,
                { color: COLORS.brownGrey, paddingVertical: SIZES.five },
              ]}
            >
              See All
            </Text>
          </MyTouchableOpacity>
        </Row>

        <FlatList
          data={NEAR_BY_PHOTOGRAPHERS}
          renderItem={rendorNearBy}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: SIZES.twenty * 8 }}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Near By Flatlist View End */}

      {/* <Modal
        isVisible={SHOWBOTTOMSHEET}
        onSwipeComplete={async () =>
          await dispatcher(FilterSearchAction.setShowFilterBottomSheet(false))
        }
        onBackdropPress={async () =>
          await dispatcher(FilterSearchAction.setShowFilterBottomSheet(false))
        }
        swipeDirection={["down"]}
        style={[styles.modal, {}]}
      >
        <View
          style={{
            borderTopLeftRadius: SIZES.twenty,
            borderTopRightRadius: SIZES.twenty,
            padding: SIZES.twenty,
            paddingBottom: SIZES.twentyFive * 1.5,
            backgroundColor: COLORS.secondary,
          }}
        >
          <Row
            style={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <MyTouchableOpacity
              onPress={async () => {
                await dispatcher(
                  FilterSearchAction.setShowFilterBottomSheet(false)
                );
              }}
            >
              <Icon
                type={FONTFAMILY.MaterialCommunityIcons}
                name={"close"}
                style={{
                  fontSize: SIZES.twentyFive * 1.25,
                  color: COLORS.brownGrey,
                }}
              />
            </MyTouchableOpacity>
            <Text style={[FONTS.mediumFont16, { color: COLORS.black }]}>
              Filters
            </Text>
            <MyTouchableOpacity
              onPress={async () => {
                await dispatcher(
                  FilterSearchAction.setShowFilterBottomSheet(false)
                );
              }}
            >
              <Text style={[FONTS.lightFont10, { color: COLORS.black }]}>
                Reset
              </Text>
            </MyTouchableOpacity>
          </Row>

          <Row
            style={{
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: SIZES.ten,
              paddingVertical: SIZES.ten,
            }}
          >
            <Text style={[FONTS.mediumFont14, { color: COLORS.black }]}>
              Location
            </Text>
            <MyTouchableOpacity
              onPress={async () => {
                await dispatcher(
                  FilterSearchAction.setShowFilterBottomSheet(false)
                );

                navigation.navigate(SCREENS.FilterLocation);
              }}
            >
              <Row style={{ alignItems: "center" }}>
                <Text
                  style={[FONTS.lightFont12, { color: COLORS.black }]}
                  numberOfLines={1}
                >
                  {SEARCHLOCATION !== null
                    ? SEARCHLOCATION?.address
                    : "Enter Location "}
                </Text>
              </Row>
            </MyTouchableOpacity>
          </Row>

          <View style={{ marginTop: SIZES.ten }}>
            <Text style={[FONTS.mediumFont14, { color: COLORS.black }]}>
              Category
            </Text>

            <FlatList
              data={CATEGORIES}
              renderItem={rendorCategory}
              horizontal
              showsHorizontalScrollIndicator={false}
              bounces={false}
              contentContainerStyle={{}}
            />
          </View>

          <View style={{ marginTop: SIZES.ten }}>
            <Row
              style={{
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={[FONTS.mediumFont14, { color: COLORS.black }]}>
                Age
              </Text>
              <Text style={[FONTS.lightFont12, { color: COLORS.black }]}>
                25
              </Text>
            </Row>
            <Slider
              style={{
                width: "100%",
                height: SIZES.twentyFive * 1.5,
              }}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor={COLORS.primary1}
              maximumTrackTintColor={COLORS.brownGrey}
              thumbTintColor={COLORS.crimson}
            />
            <Row
              style={{
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={[FONTS.lightFont12, { color: COLORS.black }]}>
                18
              </Text>
              <Text style={[FONTS.lightFont12, { color: COLORS.black }]}>
                40
              </Text>
            </Row>
          </View>

          <View style={{ marginTop: SIZES.ten }}>
            <Row
              style={{
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={[FONTS.mediumFont14, { color: COLORS.black }]}>
                Price
              </Text>
              <Text style={[FONTS.lightFont12, { color: COLORS.black }]}>
                $500
              </Text>
            </Row>
            <Slider
              style={{
                width: "100%",
                height: SIZES.twentyFive * 1.5,
              }}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor={COLORS.primary1}
              maximumTrackTintColor={COLORS.brownGrey}
              thumbTintColor={COLORS.crimson}
            />
            <Row
              style={{
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={[FONTS.lightFont12, { color: COLORS.black }]}>
                $100
              </Text>
              <Text style={[FONTS.lightFont12, { color: COLORS.black }]}>
                $1000
              </Text>
            </Row>
          </View>

          <ButtonRadius10
            label={"Apply"}
            onPress={async () =>
              await dispatcher(
                FilterSearchAction.setShowFilterBottomSheet(false)
              )
            }
            style={{ marginTop: SIZES.twentyFive }}
          />
        </View>
      </Modal> */}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    height: SIZES.fifty * 0.75,
    width: SIZES.fifty * 0.75,
    borderRadius: SIZES.fifty * 0.75,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  button2: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SIZES.twentyFive + SIZES.ten,
    paddingVertical: SIZES.fifteen,
    flex: 1,
    borderRadius: SIZES.ten,
  },
  listItem: {
    width: SIZES.fiftyWidth * 1.76,
    height: SIZES.fiftyWidth * 2,
    borderColor: COLORS.crimson,
    borderWidth: 1,
    borderColor: COLORS.primary1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: SIZES.twenty,
    marginHorizontal: SIZES.fifteen,
  },
});

const CATEGORIES = [
  {
    id: "1",
    title: "Party",
    icon: IMAGES.IconParty,
    status: false,
  },
  {
    id: "2",
    title: "Wedding",
    icon: IMAGES.IconWedding,
    status: false,
  },
  {
    id: "3",
    title: "Event",
    icon: IMAGES.IconEvents,
    status: false,
  },
  {
    id: "4",
    title: "Modelling",
    icon: IMAGES.IconModel,
    status: false,
  },
  {
    id: "5",
    title: "Wedding",
    icon: IMAGES.IconWedding,
    status: false,
  },
  {
    id: "6",
    title: "Event",
    icon: IMAGES.IconEvents,
    status: false,
  },
  {
    id: "7",
    title: "Modelling",
    icon: IMAGES.IconModel,
    status: false,
  },
];

const NEARBY = [
  {
    id: "0",
  },
  {
    id: "1",
  },
  {
    id: "2",
  },
  {
    id: "3",
  },
  {
    id: "4",
  },
  {
    id: "5",
  },
  {
    id: "6",
  },
  {
    id: "7",
  },
];

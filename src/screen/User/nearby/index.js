import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  Image,
  ImageBackground,
  Easing,
  FlatListProps,
  ListRenderItemInfo,
  Dimensions,
} from "react-native";
import NearbyItem from "../../../components/NearbyItem";
import moment from "moment";
import NormalHeader from "../../../components/NormalHeader";
import UserImageWithCrown from "../../../components/UserImageWithCrown";
import {
  COLORS,
  CONSTANTS,
  FONTFAMILY,
  FONTS,
  IMAGES,
  SCREENS,
  SIZES,
  STYLES,
  width,
} from "../../../constants";
import Card from "../../../components/Card";
import Row from "../../../components/Row";
import { Icon } from "native-base";
import Loader from "../../../components/modals/Loader";

import { useDispatch } from "react-redux";
import { CategoryByVendor } from "../../../redux/Silices/Category";

export default function Nearby(props) {
  const dispatcher = useDispatch();

  const { route, navigation } = props;
  const { id, Heading } = route?.params;

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  useEffect(() => {
    GetCategoryByVendor(id);
  }, []);

  const GetCategoryByVendor = async (id) => {
    await dispatcher(CategoryByVendor(id))
      .unwrap()
      .then((resp) => {
        setData(resp);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
      });
  };
  const scrollY = React.useRef(new Animated.Value(0)).current;

  const ITEM_SIZE = 120 * 3;

  const rendorNearByItem = ({ item, index, animation }) => {
    const inputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 2)];

    const OpacityinputRange = [
      -1,
      0,
      ITEM_SIZE * index,
      ITEM_SIZE * (index + 0.5),
    ];

    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0],
    });

    const opacity = scrollY.interpolate({
      inputRange: OpacityinputRange,
      outputRange: [1, 1, 1, 0],
    });

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          navigation.navigate(SCREENS.PhotographerProfile, {
            vendorID: item?.vendor?.id,
          });
        }}
      >
        <Animated.View
          style={{
            opacity,
            transform: [{ scale }],
            marginTop: SIZES.fifteen,
          }}
        >
          <Card
            style={{
              backgroundColor: COLORS.paleGrey,
              paddingVertical: SIZES.ten,
              // margin: SIZES.fifteen,
              borderRadius: SIZES.fifteen,
            }}
          >
            <Row
              style={{ marginHorizontal: SIZES.fifteen, alignItems: "center" }}
            >
              <UserImageWithCrown
                image={CONSTANTS.API_CALLS.IMAGE_URL + item?.vendor?.image}
              />
              <Text
                style={[
                  FONTS.mediumFont12,
                  { flex: 1, color: COLORS.black, marginHorizontal: SIZES.ten },
                ]}
              >
                Ms. {item?.vendor?.name}
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
                  {item?.vendor?.ratings}
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
                  <Text
                    style={[FONTS.mediumFont10, { color: COLORS.primary1 }]}
                  >
                    {item?.vendor?.category_name[0]?.title}
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
                  <Text
                    style={[FONTS.lightFont10, { color: COLORS.brownGrey }]}
                  >
                    {moment(item?.vendor?.created_at).format("MMM Do YY")}
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
                    {item?.vendor?.address}
                  </Text>
                </View>
              </View>
              <ImageBackground
                resizeMode={"cover"}
                source={{
                  uri: CONSTANTS.API_CALLS.IMAGE_URL + item?.portfolio?.image,
                }}
                // source={IMAGES.ImageParty}
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
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[STYLES.container, {}]}>
      <NormalHeader title={Heading} />

      <Animated.FlatList
        scrollEventThrottle={16}
        decelerationRate={"normal"}
        data={data}
        renderItem={rendorNearByItem}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingBottom: 100,
          paddingHorizontal: SIZES.fifteen,
        }}
        showsVerticalScrollIndicator={false}
        style={{ marginTop: SIZES.fifteen }}
      />

      <Loader visibility={isLoading} />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: COLORS.white,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  avatar: {
    height: 36,
    width: 36,
    borderRadius: 18,
    backgroundColor: COLORS.mushroom,
    alignItems: "center",
    justifyContent: "center",
  },
  letter: {
    color: "white",
    fontWeight: "bold",
  },
  details: {
    margin: 8,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    color: "black",
  },
  number: {
    fontSize: 14,
    color: COLORS.darkBlueGrey,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.red,
  },
  listEmpty: {
    height: Dimensions.get("window").height,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 32,
    backgroundColor: COLORS.white,
  },
});

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

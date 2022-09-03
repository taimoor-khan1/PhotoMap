import React, { useState, useCallback, useRef } from "react";
import {
  FlatList,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
} from "react-native";
import {
  COLORS,
  IMAGES,
  SIZES,
  STYLES,
  FONTS,
  SCREENS,
  CONSTANTS,
} from "../../../constants";
import CircularImage from "../../../components/CircularImage";
import MyTouchableOpacity from "../../../components/MyTouchableOpacity";
import Row from "../../../components/Row";
import { useFocusEffect } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import UserImageWithCrown from "../../../components/UserImageWithCrown";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const RecentJobsData = useSelector((state) => state.Job.RecentJobsData);
  const BestJobsData = useSelector((state) => state.Job.BestJobsData);
  const Profile = useSelector((state) => state.Profile.data);

  const [selectedTab, setSelectedTab] = useState(1);

  const scrollx = useRef(new Animated.Value(0)).current;
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle("dark-content");
      Platform.OS === "android" && StatusBar.setBackgroundColor("transparent");
    }, [])
  );

  const rendorBesMatchesJob = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          navigation.navigate(SCREENS.JobDetails, { item });
        }}
        style={[
          STYLES.shadow,
          {
            borderRadius: SIZES.ten,
            padding: SIZES.fifteen,
            marginHorizontal: SIZES.fifteen,
            marginTop: SIZES.fifteen,
          },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <UserImageWithCrown
              image={CONSTANTS.API_CALLS.IMAGE_URL + item?.image}
            />
            <View
              style={{ marginHorizontal: SIZES.ten, marginTop: SIZES.fifteen }}
            >
              <Text style={[FONTS.mediumFont14, { color: COLORS.black }]}>
                {item?.name}
              </Text>
              <View
                style={{
                  backgroundColor: "rgb(255,226,232)",
                  width: SIZES.twenty * 4,
                  height: SIZES.twenty * 2,
                  borderTopRightRadius: SIZES.twenty,
                  borderBottomRightRadius: SIZES.twenty,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={[FONTS.mediumFont12, { color: COLORS.red }]}>
                  {item?.category?.title}
                </Text>
              </View>
            </View>
          </View>
          {selectedTab === 3 && (
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                backgroundColor: COLORS.darkSlateBlue,
                paddingHorizontal: SIZES.fifteen,
                paddingVertical: SIZES.five - 2,
                borderRadius: SIZES.twenty,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={[FONTS.mediumFont12, { color: COLORS.white }]}>
                Applied
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <Text
          style={[
            FONTS.mediumFont16,
            { color: COLORS.black, marginTop: SIZES.ten },
          ]}
        >
          Party photoshot insp...
        </Text>

        <Text style={[FONTS.mediumFont12, { color: COLORS.black }]}>
          {item?.description}
        </Text>
        <Text
          style={[
            FONTS.lightFont12,
            { color: COLORS.brownGrey, marginTop: SIZES.five },
          ]}
        >
          {item?.created_at}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: SIZES.five,
          }}
        >
          <Text style={[FONTS.mediumFont14, { color: COLORS.red }]}>
            {item?.address}
          </Text>
          <Text style={[FONTS.mediumFont14, { color: COLORS.red }]}>
            ${item?.rate_required}
          </Text>
        </View>
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
            uri: CONSTANTS.API_CALLS.IMAGE_URL + Profile?.records?.image,
          }}
          style={{ position: "absolute", left: 0 }}
        />
        <Image
          source={IMAGES.LogoPhotoMap}
          resizeMode={"contain"}
          style={{ height: SIZES.twentyFiveWidth * 1.25 }}
        />
      </Row>

      <View
        style={{
          flex: 1,
          marginTop: SIZES.twenty,
        }}
      >
        <Row
          style={{
            padding: SIZES.fifteen,
          }}
        >
          <MyTouchableOpacity onPress={() => setSelectedTab(1)}>
            <Text
              style={[
                selectedTab === 1 ? FONTS.boldFont16 : FONTS.mediumFont14,
                {
                  color: selectedTab === 1 ? COLORS.red : COLORS.black,
                },
              ]}
            >
              Best Matches
            </Text>
            <View
              style={[
                styles.tabLine,
                {
                  height: selectedTab === 1 ? 3 : 0,
                },
              ]}
            />
          </MyTouchableOpacity>

          <MyTouchableOpacity
            onPress={() => setSelectedTab(2)}
            style={{ marginLeft: SIZES.twenty * 2 }}
          >
            <Text
              style={[
                selectedTab === 2 ? FONTS.boldFont16 : FONTS.mediumFont14,
                {
                  color: selectedTab === 2 ? COLORS.red : COLORS.black,
                },
              ]}
            >
              Recent Jobs
            </Text>
            <View
              style={[
                styles.tabLine,
                {
                  height: selectedTab === 2 ? 3 : 0,
                },
              ]}
            />
          </MyTouchableOpacity>
        </Row>

        {selectedTab === 1 && (
          <View>
            <FlatList
              data={BestJobsData}
              keyExtractor={(item) => item.id}
              renderItem={rendorBesMatchesJob}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 300 }}
            />
          </View>
        )}

        {selectedTab === 2 && (
          <View>
            <FlatList
              data={RecentJobsData}
              keyExtractor={(item) => item.id}
              renderItem={rendorBesMatchesJob}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 300 }}
            />
          </View>
        )}
      </View>
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
  tabLine: {
    width: SIZES.fifty * 1.2,
    borderRadius: 10,
    marginTop: SIZES.five,
    backgroundColor: COLORS.crimson,
  },
});

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

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import NormalHeader from "../../../components/NormalHeader";
import { useNavigation } from "@react-navigation/native";
import {
  COLORS,
  IMAGES,
  SIZES,
  STYLES,
  FONTS,
  SCREENS,
  CONSTANTS,
} from "../../../constants";
import UserImageWithCrown from "../../../components/UserImageWithCrown";
import { useSelector } from "react-redux";

export default function AppliedJob() {
  const navigation = useNavigation();
  const AppliedJobData = useSelector((state) => state.Job.AppliedJobsData);
  const [appliedData, setappliedData] = useState(AppliedJobData);

  useEffect(() => {}, [appliedData]);

  const rendorBesMatchesJob = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          // navigation.navigate(SCREENS.JobDetails);
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
              {item?.status}
            </Text>
          </TouchableOpacity>
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
            {item?.location}
          </Text>
          <Text style={[FONTS.mediumFont14, { color: COLORS.red }]}>
            ${item?.rate_required}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={STYLES.container}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text style={[FONTS.boldFont22]}>Applied Job</Text>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={appliedData}
          keyExtractor={(item) => item.id}
          renderItem={rendorBesMatchesJob}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 300, marginTop: SIZES.ten }}
        />
      </View>
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

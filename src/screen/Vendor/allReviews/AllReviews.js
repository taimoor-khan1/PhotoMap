import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import NormalHeader from "../../../components/NormalHeader";
import { COLORS, FONTS, SIZES, IMAGES, STYLES } from "../../../constants";
import StarRating from "react-native-star-rating";
import UserImageWithCrown from "../../../components/UserImageWithCrown";
import { Ratings } from "../../../redux/Silices/GetRating";
import Loader from "../../../components/modals/Loader";

import { useDispatch } from "react-redux";

export default function AllReviews(props) {
  const dispatcher = useDispatch();

  const [ReviewList, setReviewList] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { navigation, route } = props;
  const { item } = route?.params;

  useEffect(() => {
    GetReviews(item);
  }, []);

  const GetReviews = async (item) => {
    await dispatcher(Ratings(item?.portfolio?.vendor_id))
      .unwrap()
      .then((resp) => {
        setReviewList(resp.reviews);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
      });
  };

  return (
    <View style={STYLES.container}>
      <NormalHeader title="All Reviews" />
      <FlatList
        data={ReviewList}
        keyExtractor={(Item) => Item.id}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                borderWidth: 1,
                borderColor: COLORS.brownGrey,
                borderRadius: SIZES.ten,
                padding: SIZES.fifteen,
                marginHorizontal: SIZES.fifteen,
                marginBottom: SIZES.fifteen,
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
                    {/* {item?.name} */}
                  </Text>
                  <Text
                    style={[FONTS.lightFont12, { color: COLORS.brownGrey }]}
                  >
                    {item?.created_at}
                  </Text>
                  <View>
                    <StarRating
                      disabled={true}
                      animation={"rotate"}
                      emptyStar={IMAGES.IconStarUnfilled}
                      fullStar={IMAGES.IconStarFilled}
                      maxStars={5}
                      containerStyle={{ width: 75 }}
                      halfStarEnabled={false}
                      rating={item?.rating}
                      starSize={13}
                    />
                  </View>
                </View>
              </View>

              <Text
                style={[
                  FONTS.mediumFont14,
                  { color: COLORS.brownGrey, marginTop: SIZES.ten },
                ]}
              >
                {item?.comments}
              </Text>
            </View>
          );
        }}
        contentContainerStyle={{
          marginTop: 20,
          paddingBottom: 150,
        }}
      />
      <Loader visibility={isLoading} />
    </View>
  );
}

const styles = StyleSheet.create({
  myStarStyle: {
    color: "yellow",
  },
  myEmptyStarStyle: {
    color: "red",
  },
});

const ReviewData = [
  {
    id: 1,
    name: "John Andrew",
    number: "1 min ago",
    dec:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.",
  },
  {
    id: 2,
    name: "John Andrew",
    number: "1 min ago",
    dec:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.",
  },
  {
    id: 3,
    name: "John Andrew",
    number: "1 min ago",
    dec:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.",
  },
  {
    id: 4,
    name: "John Andrew",
    number: "1 min ago",
    dec:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s.",
  },
];

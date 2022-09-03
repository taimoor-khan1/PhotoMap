import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  STYLES,
  COLORS,
  IMAGES,
  SIZES,
  FONTS,
  FONTFAMILY,
  CONSTANTS,
  SCREENS,
} from "../../../constants/theme";
import StarRating from "react-native-star-rating";
import { Icon } from "native-base";
import MessageEditText from "../../../components/MessageEditText";
import ButtonRadius10 from "../../../components/ButtonRadius10";
import Card from "../../../components/Card";
import NormalHeader from "../../../components/NormalHeader";
import Row from "../../../components/Row";
import UserImageWithCrown from "../../../components/UserImageWithCrown";
import axios from "axios";
import { store } from "../../../redux/store";
import utils from "../../../utils";

export default function RateAndRevew(props) {
  const { route, navigation } = props;
  const { data } = route?.params;

  const [comment, setComment] = useState("");
  const [ratings, setratings] = useState(0);

  {
    /*********Methood on Changing Ratings *********/
  }

  const onStarRatingPress = (rating) => {
    setratings(rating);
  };

  const uploadJob = () => {
    const uploaddata = {
      vendorID: data.data[0].vendor_id,
      rating: ratings,
      comments: comment,
      postID: "1",
    };
    const formData = new FormData();
    for (const [key, value] of Object.entries(uploaddata)) {
      formData.append(key, value);
    }
    axios
      .post(
        CONSTANTS.API_CALLS.BASE_URL + CONSTANTS.API_CALLS.ADD_RATING,
        formData,
        {
          headers: {
            Authorization: store.getState().Auth.accessToken,
          },
        }
      )
      .then((response) => {
        utils.successAlert("Thank you for your Feedback");
        navigation.navigate(SCREENS.DrawerNavigator);
      })
      .catch((err) => {
        let errorMsg = utils.showResponseError(err);
      });
  };
  return (
    <View style={[STYLES.container]}>
      {/* <StatusBar backgroundColor={COLORS.secondary} barStyle={"dark-content"} /> */}
      <NormalHeader title="Rate & Review" />

      <View
        style={{
          backgroundColor: COLORS.white,
          padding: SIZES.fifteen,
          borderRadius: SIZES.ten,
          marginTop: SIZES.five,
        }}
      >
        {/*********Header Row Image Ratings View Start *********/}
        <Row
          style={{
            marginTop: SIZES.twenty,
            alignItems: "center",
          }}
        >
          <UserImageWithCrown
            image={CONSTANTS.API_CALLS.IMAGE_URL + data?.data[0]?.vendor?.image}
          />
          <View style={{ flex: 1, marginHorizontal: SIZES.ten }}>
            <Text style={[FONTS.mediumFont12, { color: COLORS.black }]}>
              Ms. {data?.data[0]?.vendor?.name}
            </Text>
            <Text style={[FONTS.mediumFont10, { color: COLORS.brownGrey }]}>
              Party photoshot inspiration
            </Text>
            <Text
              style={[
                FONTS.lightFont10,
                { color: COLORS.primary1, marginTop: SIZES.five },
              ]}
            >
              {data?.data[0]?.vendor?.address}
            </Text>
          </View>
        </Row>
        <View>
          <Text style={[FONTS.mediumFont16, { marginVertical: SIZES.fifteen }]}>
            What is your rate?
          </Text>

          <StarRating
            animation="bounce"
            maxStars={5}
            fullStarColor={COLORS.golden}
            halfStarColor={COLORS.golden}
            emptyStarColor={COLORS.golden}
            starSize={SIZES.twenty * 2.5}
            rating={ratings}
            selectedStar={(ratings) => onStarRatingPress(ratings)}
            containerStyle={{
              paddingHorizontal: SIZES.twenty * 0.5,
              paddingVertical: SIZES.twenty,
            }}
            // starStyle={{marginLeft: SIZES.ten}}
          />
          <Text
            style={[
              FONTS.mediumFont14,
              { color: COLORS.brownGrey, marginBottom: SIZES.twenty },
            ]}
          >
            Please share your opinion about the photographer
          </Text>
          <MessageEditText
            value={comment}
            onChangeText={(text) => {
              setComment(text);
            }}
            placeholder="Write something here.."
          />
        </View>
        {/*********Feed Back View End *********/}

        {/*********Radius Button Cancel Booking *********/}
        <ButtonRadius10
          onPress={() => {
            uploadJob();
          }}
          label="Submit"
          style={{ marginTop: SIZES.twenty * 2.5 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});

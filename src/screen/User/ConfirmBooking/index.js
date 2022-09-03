import moment from "moment";
import React from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ButtonRadius10 from "../../../components/ButtonRadius10";
import EditText from "../../../components/EditText";
import NormalHeader from "../../../components/NormalHeader";
import Row from "../../../components/Row";
import UserImageWithCrown from "../../../components/UserImageWithCrown";
import { store } from "../../../redux/store";

import {
  COLORS,
  CONSTANTS,
  FONTFAMILY,
  FONTS,
  height,
  IMAGES,
  SCREENS,
  SIZES,
  STYLES,
} from "../../../constants";
import axios from "axios";
import utils from "../../../utils";
import { BookingDetail } from "../../../redux/Silices/BookingDetail";

export default function ConfirmBooking(props) {
  const { navigation, route } = props;
  const dispatcher = useDispatch();

  const { date, data } = route?.params;
  const USERPROFILE = useSelector((state) => state.Profile.data);

  const ConfirmBooking = () => {
    const postdata = {
      booking_date: moment(date).format("YYYY-MM-DD"),
      booking_time: moment(date).format("hh:mm:ss"),
      vendorID: data?.users[0]?.id,
      cardID: "1",
    };

    const formData = new FormData();
    for (const [key, value] of Object.entries(postdata)) {
      formData.append(key, value);
    }
    // console.log(formData);

    const onSuccess = ({ data }) => {
      console.log("datata on success ", data);
      dispatcher(BookingDetail());
      utils.successAlert(data?.message + " Booked");
      navigation.navigate(SCREENS.RateAndReview, { data });
    };

    const onFailure = (error) => {
      console.log("error", utils.showResponseError(error));
    };
    let config = {
      headers: {
        Authorization: store.getState().Auth.accessToken,
      },
    };
    axios
      .post(
        CONSTANTS.API_CALLS.BASE_URL + CONSTANTS.API_CALLS.BOOKING,
        postdata,
        config
      )
      .then(onSuccess)
      .catch(onFailure);
  };
  return (
    <View style={STYLES.container}>
      {/* <StatusBar backgroundColor={COLORS.secondary} barStyle={'dark-content'} /> */}

      <NormalHeader title={"Booking Details"} />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: height * 0.15,
        }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <Row
          style={{
            marginHorizontal: SIZES.fifteen,
            marginTop: SIZES.twenty,
            alignItems: "center",
          }}
        >
          <UserImageWithCrown
            image={CONSTANTS.API_CALLS.IMAGE_URL + data?.users[0]?.image}
          />
          <View style={{ flex: 1, marginHorizontal: SIZES.ten }}>
            <Text style={[FONTS.mediumFont12, { color: COLORS.black }]}>
              Ms. {data?.users[0]?.name}
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
              {data?.users[0]?.address}
            </Text>
          </View>

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
              {data?.users[0]?.ratings}
            </Text>
          </Row>
        </Row>

        <View style={[STYLES.horLine, { marginHorizontal: SIZES.fifteen }]} />

        <Row style={{ marginHorizontal: SIZES.fifteen }}>
          <View style={{ flex: 1 }}>
            <Text style={[FONTS.mediumFont12, { color: COLORS.black }]}>
              Date & Time
            </Text>
            <Text style={[FONTS.lightFont12, { color: COLORS.primary1 }]}>
              {moment(date).format("MMMM Do YYYY, h:mm:ss a")}
            </Text>
          </View>
          <View style={{}}>
            <Text style={[FONTS.mediumFont12, { color: COLORS.black }]}>
              Booking Fee
            </Text>
            <Text style={[FONTS.lightFont12, { color: COLORS.primary1 }]}>
              {data?.users[0]?.price}
            </Text>
          </View>
        </Row>

        <View
          style={{ marginTop: SIZES.twenty, marginHorizontal: SIZES.fifteen }}
        >
          <EditText
            hasIcon
            name="person-outline"
            type={FONTFAMILY.Ionicons}
            editable={false}
            value={USERPROFILE?.records?.name}
          />
          <EditText
            hasIcon
            name="mail"
            type={FONTFAMILY.AntDesign}
            editable={false}
            value={USERPROFILE?.records?.email}
            style={{ marginTop: SIZES.fifteen }}
          />
          <EditText
            hasIcon
            name="phone"
            type={FONTFAMILY.SimpleLineIcons}
            editable={false}
            value={USERPROFILE?.records?.phone}
            style={{ marginTop: SIZES.fifteen }}
          />
          <EditText
            hasIcon
            name="ios-location-outline"
            type={FONTFAMILY.Ionicons}
            editable={false}
            value={USERPROFILE?.records?.address}
            style={{ marginTop: SIZES.fifteen }}
          />

          <Text
            style={[
              FONTS.mediumFont12,
              { color: COLORS.black, marginTop: SIZES.ten },
            ]}
          >
            By booking this appointment, you agree to the{" "}
            <Text style={[{ color: COLORS.crimson }]}>Terms & Conditions</Text>
          </Text>
        </View>

        <ButtonRadius10
          label={"Confirm Booking"}
          style={{
            marginTop: SIZES.twentyFive * 1.5,
            marginHorizontal: SIZES.fifteen,
          }}
          onPress={async () => {
            ConfirmBooking();
            // navigation.navigate(SCREENS.SelectCard, { date, data });
          }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});

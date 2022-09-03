import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ButtonRadius10 from "../../../components/ButtonRadius10";
import NormalHeader from "../../../components/NormalHeader";
import UserImageWithCrown from "../../../components/UserImageWithCrown";
import {
  COLORS,
  CONSTANTS,
  FONTS,
  SCREENS,
  SIZES,
  STYLES,
} from "../../../constants";
import { store } from "../../../redux/store";
import utils from "../../../utils";

export default function JobDetails(props) {
  const { navigation, route } = props;
  const { item } = route?.params;

  const ApplyJob = () => {
    const data = {
      job_id: item?.id,
    };
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }
    axios
      .post(
        CONSTANTS.API_CALLS.BASE_URL + CONSTANTS.API_CALLS.APPLY_JOB,
        formData,
        {
          headers: {
            Authorization: store.getState().Auth.accessToken,
          },
        }
      )
      .then((response) => {
        utils.successAlert(response.data.message);
        navigation.navigate(SCREENS.DrawerNavigator);
      })
      .catch((err) => {
        let errMsg = utils.showResponseError(err);
        console.log(errMsg);
      });
  };
  return (
    <View style={[STYLES.container]}>
      <NormalHeader title="Job Details" />

      <View
        style={[
          {
            paddingHorizontal: SIZES.fifteen,
            marginTop: SIZES.twenty,
          },
        ]}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            //   navigation.navigate(SCREENS.JobDetails);
          }}
          style={[
            STYLES.shadow,
            {
              borderRadius: SIZES.ten,
              padding: SIZES.fifteen,
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
                style={{
                  marginHorizontal: SIZES.ten,
                  marginTop: SIZES.fifteen,
                }}
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
                    Party
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <Text
            style={[
              FONTS.mediumFont16,
              { color: COLORS.black, marginTop: SIZES.ten },
            ]}
          >
            {item?.description}
          </Text>

          <Text style={[FONTS.mediumFont12, { color: COLORS.black }]}>
            desc
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
              {item?.rate_required}
            </Text>
          </View>
        </TouchableOpacity>

        <ButtonRadius10
          label={"Apply"}
          style={{ marginTop: SIZES.fifteen * 4 }}
          onPress={() => {
            ApplyJob();

            // navigation.goBack();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});

import { ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import React, { useState } from "react";
import {
  STYLES,
  SIZES,
  COLORS,
  FONTS,
  height,
  SCREENS,
} from "../../constants/theme";
import NormalHeader from "../../components/NormalHeader";
import { CreditCardInput } from "../../components/StripCardComponent";
import SwitchToggle from "react-native-switch-toggle";
import ButtonRadius10 from "../../components/ButtonRadius10";

export default function AddCard({ navigation }) {
  const [CardInput, setCardInput] = React.useState({});

  const [isEnabled, setIsEnabled] = useState(false);
  const _onChange = (data) => {
    setCardInput(data);
  };

  const AddCard = () => {
    if (
      eventCategoryID === undefined ||
      eventCategoryID === null ||
      eventCategoryID === ""
    ) {
      utils.errorAlert(" kindly select event Category");
    } else {
      const data = {
        event_caption: eventCaption,
        category_id: eventCategoryID,
        rate_required: rateRequired,
        location: location,
        lantitude: latitude,
        longitude: longitude,
        address: address,
        availability: availability,
        description: description,
      };
      const formData = new FormData();
      for (const [key, value] of Object.entries(data)) {
        formData.append(key, value);
      }
      axios
        .post(
          CONSTANTS.API_CALLS.BASE_URL + CONSTANTS.API_CALLS.POST_JOB,
          formData,
          {
            headers: {
              Authorization: store.getState().Auth.accessToken,
            },
          }
        )
        .then((response) =>
          utils.successAlert(response.data.message + " Upload")
        )
        .catch((err) => {});
    }
  };

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <View style={STYLES.container}>
      <NormalHeader title={"Add Card"} />

      <ScrollView
        style={{ paddingHorizontal: SIZES.fifteen }}
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{ paddingBottom: height * 0.15 }}
      >
        <View style={{ marginTop: SIZES.twenty }}>
          <CreditCardInput
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            validColor="#000"
            placeholderColor="#000"
            requiresName={true}
            onChange={_onChange}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: SIZES.twenty,
            }}
          >
            <SwitchToggle
              switchOn={isEnabled}
              onPress={() => setIsEnabled(!isEnabled)}
              containerStyle={{
                width: SIZES.twenty * 2,
                height: SIZES.five,
                borderRadius: 25,
                // padding: 5,
              }}
              circleStyle={{
                width: SIZES.fifteen,
                height: SIZES.fifteen,
                borderRadius: SIZES.fifteen,
              }}
              backgroundColorOn={COLORS.blackWithOpacity}
              circleColorOn={COLORS.primary1}
            />
            <Text
              style={[
                FONTS.mediumFont12,
                { color: COLORS.blackWithOpacity, marginStart: SIZES.ten },
              ]}
            >
              Make as Default Card
            </Text>
          </View>
          <ButtonRadius10
            style={{ marginTop: height * 0.035 }}
            label={"Confirm payment"}
            onPress={() => {
              navigation.navigate(SCREENS.DrawerNavigator);
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainerStyle: {
    borderWidth: 1,
    borderRadius: 5,
  },
  inputStyle: {
    // paddingLeft: 15,
    // borderRadius: 5,
    color: "#fff",
  },
  labelStyle: {
    // marginBottom: 5,
    fontSize: 12,
  },
});

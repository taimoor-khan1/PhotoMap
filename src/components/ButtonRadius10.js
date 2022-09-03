/* @flow weak */
import React from "react";
import { StyleSheet, Text, Platform } from "react-native";
import MyTouchableOpacity from "./MyTouchableOpacity";
import { COLORS, FONTFAMILY, STYLES, SIZES, FONTS } from "../constants";
import { Icon } from "native-base";
import Card from "./Card";
import LinearGradient from "react-native-linear-gradient";

const ButtonRadius10 = ({ label, onPress, style, icon, isBrightButton }) => {
  return (
    <Card style={[style, { borderRadius: SIZES.twenty, height: 60 }]}>
      <LinearGradient
        colors={[COLORS.primary1, COLORS.crimson]}
        style={[styles.loginBtnBg, {}]}
      >
        <MyTouchableOpacity
          onPress={onPress}
          style={[
            styles.loginBtnBg,
            {
              justifyContent: icon ? "space-between" : "center",
            },
          ]}
        >
          <Text
            style={[
              FONTS.boldFont18,
              {
                color: isBrightButton ? COLORS.primary1 : COLORS.white,
                textAlign: "center",
              },
            ]}
          >
            {label}
          </Text>
        </MyTouchableOpacity>
      </LinearGradient>
    </Card>
  );
};

export default ButtonRadius10;

const styles = StyleSheet.create({
  loginBtnBg: {
    paddingLeft: "10%",
    paddingRight: "10%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: SIZES.twenty,
    width: "100%",
    height: 60,
  },
});

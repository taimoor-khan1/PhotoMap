import React from "react";
import { useEffect } from "react";
import {
  Image,
  ImageBackground,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Card from "../../components/Card";
import MyTouchableOpacity from "../../components/MyTouchableOpacity";
import {
  SCREENS,
  IMAGES,
  FONTFAMILY,
  COLORS,
  SIZES,
  FONTS,
  height,
  width,
} from "../../constants/theme";

export default function Splash({ navigation }) {
  const Button = ({ isBright, label, style, onPress }) => {
    return (
      <LinearGradient
        colors={
          isBright
            ? [COLORS.transparent, COLORS.transparent]
            : [COLORS.primary1, COLORS.crimson]
        }
        style={[
          styles.viewButton,
          style,
          isBright
            ? {
                justifyContent: "center",
                borderRadius: SIZES.twenty,
                backgroundColor: COLORS.transparent,
                borderWidth: 1,
                borderColor: COLORS.white,
              }
            : null,
        ]}
      >
        <MyTouchableOpacity
          onPress={onPress}
          style={{
            height: "100%",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <Text
            style={[
              FONTS.boldFont18,
              {
                color: COLORS.white,
                textAlign: "center",
              },
            ]}
          >
            {label}
          </Text>
        </MyTouchableOpacity>
      </LinearGradient>
    );
  };

  return (
    <ImageBackground
      source={IMAGES.BGSplash}
      style={{ height: height, width: width }}
    >
      {/* <StatusBar hidden /> */}
      <LinearGradient
        colors={[COLORS.transparent, COLORS.transparent]}
        style={{
          flex: 1,
          padding: SIZES.fifteen,
          justifyContent: "space-between",
        }}
      >
        <View style={{ marginTop: getStatusBarHeight() * 2.5 }}>
          <Text
            style={[
              {
                color: COLORS.white,
                fontSize: SIZES.h24 * 2.5,
                fontFamily: FONTFAMILY.Bold,
                lineHeight: 65,
              },
            ]}
          >
            Hey!{"\n"}Ready for{"\n"}Tonight?
          </Text>
          <Text
            style={[
              FONTS.mediumFont14,
              {
                color: COLORS.white,
                lineHeight: 15,
              },
            ]}
          >
            Let's find your favourite photographer{"\n"}for you
          </Text>
        </View>

        <View
          style={{ marginBottom: Platform.OS === "ios" ? SIZES.fifteen : 0 }}
        >
          <Button
            label={"Sign In"}
            isBright
            onPress={() => navigation.navigate(SCREENS.LoginAccount)}
          />
          <Button
            label={"Sign Up"}
            style={{ marginTop: SIZES.fifteen }}
            onPress={() => navigation.navigate(SCREENS.CreateAccount)}
          />
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  viewButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: SIZES.twenty,
    width: "100%",
    height: 60,
  },
});

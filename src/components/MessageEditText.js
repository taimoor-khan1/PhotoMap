import React from "react";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { COLORS, FONTFAMILY, FONTS, SIZES } from "../constants";

export default function MessageEditText(props) {
  const [borderColor, setBorderColor] = React.useState(COLORS.blackWithOpacity);
  const [secureText, setsecureText] = React.useState(true);
  const [eye, seteye] = React.useState("eye-off");

  const { value, onChangeText, placeholder } = props;
  return (
    <View
      style={[
        styles.card,
        props.style,
        {
          flexDirection: "row",
          alignItems: "center",
          borderColor: borderColor,
          borderWidth: 1,
          borderRadius: SIZES.ten,
          paddingHorizontal: SIZES.ten,
        },
      ]}
    >
      <TextInput
        secureTextEntry={false}
        placeholderTextColor={COLORS.blackWithOpacity}
        autoCapitalize="none"
        blurOnSubmit={true}
        onFocus={() => setBorderColor(COLORS.crimson)}
        onBlur={() => setBorderColor(COLORS.grey)}
        selectionColor={COLORS.primary1}
        placeholder={placeholder}
        keyboardType={"default"}
        value={value}
        onChangeText={onChangeText}
        style={[styles.textInput, FONTS.mediumFont14]}
        multiline={true}
        numberOfLines={5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: SIZES.ten * 17,
    fontSize: SIZES.fifteen - 1,
    flex: 1,
    width: SIZES.ten,
    color: COLORS.black,
    textAlignVertical: "top",
    fontFamily: FONTFAMILY.Medium,
  },
  iconPassword: {
    fontSize: SIZES.twenty,
    height: SIZES.twenty,
    width: SIZES.twenty,
    color: COLORS.darkBlueGrey,
  },
});

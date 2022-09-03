import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import { COLORS } from "../constants";
import MyTouchableOpacity from "../components/MyTouchableOpacity";
import {
  FONTFAMILY,
  FONTS,
  height,
  SIZES,
  STYLES,
  width,
} from "../constants/theme";
import { Icon } from "native-base";

export default function EditText(props) {
  const [borderColor, setBorderColor] = useState(COLORS.blackWithOpacity);
  const [iconColor, setIconColor] = useState(COLORS.blackWithOpacity);
  const [show, setshow] = useState("eye");
  const [showText, setShowText] = useState(true);

  const passwordShow = () => {
    if (show === "eye") {
      setshow("eye-slash");
      setShowText(false);
    } else {
      setShowText(true);
      setshow("eye");
    }
  };

  return (
    <View
      style={[
        {
          width: "100%",
          justifyContent: "center",
          borderWidth: 1,
          paddingHorizontal: SIZES.fifteen,
          height: 60,
          borderRadius: SIZES.ten,
          borderColor: borderColor,
          marginVertical: SIZES.five,
        },
        props.style,
      ]}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          {props.hasIcon ? (
            <Icon
              type={props.type}
              name={props.name}
              style={{
                color: iconColor,
                marginRight: SIZES.ten,
                fontSize: SIZES.twenty,
              }}
            />
          ) : null}
          <TextInput
            {...props}
            secureTextEntry={props.password ? showText : false}
            selectionColor={COLORS.primary1}
            placeholderTextColor={COLORS.blackWithOpacity}
            onFocus={() => {
              setBorderColor(COLORS.crimson);
              setIconColor(COLORS.primary1);
            }}
            onBlur={() => {
              setBorderColor(COLORS.blackWithOpacity);
              setIconColor(COLORS.blackWithOpacity);
            }}
            style={[
              FONTS.mediumFont14,
              {
                flex: 1,
                color: COLORS.black,
              },
            ]}
          />
        </View>
        {props.password ? (
          <MyTouchableOpacity
            onPress={() => {
              passwordShow();
            }}
          >
            <Icon
              name={show}
              type={"FontAwesome"}
              style={{ fontSize: 20, color: COLORS.brownGrey, marginLeft: 5 }}
            />
          </MyTouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

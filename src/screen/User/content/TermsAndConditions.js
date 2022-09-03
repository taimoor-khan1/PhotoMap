import React from "react";
import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { COLORS, FONTS, height, SIZES, STYLES } from "../../../constants";
import NormalHeader from "../../../components/NormalHeader";
import { useSelector } from "react-redux";

export default function TermsAndConditions() {
  const ContentData = useSelector((state) => state.Content.data);

  return (
    <View style={[STYLES.container, {}]}>
      {/* <StatusBar backgroundColor={COLORS.secondary} barStyle={"dark-content"} /> */}
      <NormalHeader title={"Terms & Conditions"} />
      <View
        style={{
          height: height - 200,
          marginTop: SIZES.fifteen,
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 150 }}
        >
          <Text
            style={[
              FONTS.lightFont14,
              { color: COLORS.black, margin: SIZES.fifteen },
            ]}
          >
            {ContentData?.terms_condition_paragraph}
          </Text>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});

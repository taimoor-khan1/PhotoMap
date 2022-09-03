import React, { useState } from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import BackArrow from "../../components/BackArrow";
import ButtonRadius10 from "../../components/ButtonRadius10";
import SearchBar from "../../components/SearchBar";
import { COLORS, SIZES, FONTFAMILY, FONTS } from "../../constants";
import Row from "./../../components/Row";
import { RadioButton } from "react-native-paper";
import Modal from "react-native-modal";
import Slider from "@react-native-community/slider";
import MyTouchableOpacity from "../../components/MyTouchableOpacity";
import { Icon } from "native-base";

export default function Search() {
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [value, setValue] = useState("");

  return (
    <View
      style={[
        {
          paddingHorizontal: SIZES.fifteen,
          backgroundColor: COLORS.secondary,
          flex: 1,
          paddingTop:
            Platform.OS === "android"
              ? SIZES.twenty * 3
              : getStatusBarHeight(true),
        },
      ]}
    >
      <Row style={{ alignItems: "center" }}>
        <BackArrow />
        <SearchBar
          isTextinput
          style={{ flex: 1 }}
          editable={true}
          onFilterPress={() => {
            setIsFilterModalVisible(true);
          }}
        />
      </Row>

      {/* Near By Flatlist View End */}

      <Modal
        isVisible={isFilterModalVisible}
        onSwipeComplete={() => setIsFilterModalVisible(false)}
        onBackdropPress={() => setIsFilterModalVisible(false)}
        swipeDirection={["down"]}
        style={styles.modal}
      >
        <View
          style={{
            borderTopLeftRadius: SIZES.twenty,
            borderTopRightRadius: SIZES.twenty,
            padding: SIZES.twenty,
            paddingBottom: SIZES.twentyFive * 1.5,
            backgroundColor: COLORS.secondary,
          }}
        >
          <Row
            style={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <MyTouchableOpacity
              onPress={() => {
                setIsFilterModalVisible(false);
              }}
            >
              {/* <MaterialCommunityIcons
                name="close"
                size={SIZES.twentyFive * 1.25}
                color={COLORS.brownGrey}
              /> */}
              <Icon
                type={FONTFAMILY.MaterialCommunityIcons}
                name={"close"}
                style={{
                  fontSize: SIZES.twentyFive * 1.25,
                  color: COLORS.brownGrey,
                }}
              />
            </MyTouchableOpacity>
            <Text style={[FONTS.mediumFont16, { color: COLORS.black }]}>
              Filters
            </Text>
            <MyTouchableOpacity
              onPress={() => {
                setIsFilterModalVisible(false);
              }}
            >
              <Text style={[FONTS.lightFont10, { color: COLORS.black }]}>
                Reset
              </Text>
            </MyTouchableOpacity>
          </Row>

          <Row
            style={{
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: SIZES.ten,
              paddingVertical: SIZES.ten,
            }}
          >
            <Text style={[FONTS.mediumFont14, { color: COLORS.black }]}>
              Location
            </Text>
            <MyTouchableOpacity>
              <Row style={{ alignItems: "center" }}>
                <Text style={[FONTS.lightFont12, { color: COLORS.black }]}>
                  Sydney, Australia
                </Text>
                {/* <Ionicons
                  name="ios-chevron-forward-sharp"
                  size={SIZES.twenty}
                  color="black"
                /> */}
              </Row>
            </MyTouchableOpacity>
          </Row>

          <View style={{ marginTop: SIZES.ten }}>
            <Text style={[FONTS.mediumFont14, { color: COLORS.black }]}>
              Category
            </Text>
            <RadioButton.Group
              onValueChange={(newValue) => setValue(newValue)}
              value={value}
            >
              <Row>
                <MyTouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => setValue("w")}
                >
                  <Row style={{ alignItems: "center" }}>
                    <RadioButton
                      value="w"
                      color={COLORS.crimson}
                      uncheckedColor={COLORS.brownGrey}
                    />
                    <Text style={[FONTS.lightFont12, {}]}>Wedding</Text>
                  </Row>
                </MyTouchableOpacity>
                <MyTouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => setValue("f")}
                >
                  <Row style={{ alignItems: "center" }}>
                    <RadioButton
                      value="f"
                      color={COLORS.crimson}
                      uncheckedColor={COLORS.brownGrey}
                    />
                    <Text style={[FONTS.lightFont12, {}]}>Fashion</Text>
                  </Row>
                </MyTouchableOpacity>
                <MyTouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => setValue("p")}
                >
                  <Row style={{ alignItems: "center" }}>
                    <RadioButton
                      value="p"
                      color={COLORS.crimson}
                      uncheckedColor={COLORS.brownGrey}
                    />
                    <Text style={[FONTS.lightFont12, {}]}>Party</Text>
                  </Row>
                </MyTouchableOpacity>
                <MyTouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => setValue("e")}
                >
                  <Row style={{ alignItems: "center" }}>
                    <RadioButton
                      value="e"
                      color={COLORS.crimson}
                      uncheckedColor={COLORS.brownGrey}
                    />
                    <Text style={[FONTS.lightFont12, {}]}>Events</Text>
                  </Row>
                </MyTouchableOpacity>
              </Row>
            </RadioButton.Group>
          </View>

          <View style={{ marginTop: SIZES.ten }}>
            <Row
              style={{
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={[FONTS.mediumFont14, { color: COLORS.black }]}>
                Age
              </Text>
              <Text style={[FONTS.lightFont12, { color: COLORS.black }]}>
                25
              </Text>
            </Row>
            <Slider
              style={{
                width: "100%",
                height: SIZES.twentyFive * 1.5,
              }}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor={COLORS.primary1}
              maximumTrackTintColor={COLORS.brownGrey}
              thumbTintColor={COLORS.crimson}
            />
            <Row
              style={{
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={[FONTS.lightFont12, { color: COLORS.black }]}>
                18
              </Text>
              <Text style={[FONTS.lightFont12, { color: COLORS.black }]}>
                40
              </Text>
            </Row>
          </View>

          <View style={{ marginTop: SIZES.ten }}>
            <Row
              style={{
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={[FONTS.mediumFont14, { color: COLORS.black }]}>
                Price
              </Text>
              <Text style={[FONTS.lightFont12, { color: COLORS.black }]}>
                $500
              </Text>
            </Row>
            <Slider
              style={{
                width: "100%",
                height: SIZES.twentyFive * 1.5,
              }}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor={COLORS.primary1}
              maximumTrackTintColor={COLORS.brownGrey}
              thumbTintColor={COLORS.crimson}
            />
            <Row
              style={{
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={[FONTS.lightFont12, { color: COLORS.black }]}>
                $100
              </Text>
              <Text style={[FONTS.lightFont12, { color: COLORS.black }]}>
                $1000
              </Text>
            </Row>
          </View>

          <ButtonRadius10
            label={"Apply"}
            onPress={() => setIsFilterModalVisible(false)}
            style={{ marginTop: SIZES.twentyFive }}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    height: SIZES.fifty * 0.75,
    width: SIZES.fifty * 0.75,
    borderRadius: SIZES.fifty * 0.75,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  button2: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SIZES.twentyFive + SIZES.ten,
    paddingVertical: SIZES.fifteen,
    flex: 1,
    borderRadius: SIZES.ten,
  },
  listItem: {
    width: SIZES.fiftyWidth * 1.76,
    height: SIZES.fiftyWidth * 2,
    borderColor: COLORS.crimson,
    borderWidth: 1,
    borderColor: COLORS.primary1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: SIZES.twenty,
    marginHorizontal: SIZES.fifteen,
  },
});

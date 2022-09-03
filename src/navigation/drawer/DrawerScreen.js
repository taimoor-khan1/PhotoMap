import React, { useState } from "react";
import { Icon } from "native-base";
import { CommonActions } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import Modal from "react-native-modal";

import CircularImage from "../../components/CircularImage";
import MyTouchableOpacity from "../../components/MyTouchableOpacity";
import Row from "../../components/Row";
import {
  COLORS,
  CONSTANTS,
  FONTFAMILY,
  FONTS,
  IMAGES,
  SCREENS,
  SIZES,
  STYLES,
} from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import * as TabAction from "../../store/Action/TabAction";
import { removeAccessToken } from "../../redux/Silices/Auth";
import { moment } from "moment";

export default function More({ navigation }) {
  const dispatch = useDispatch();

  const onTabPressed = async (item) => {
    await dispatch(TabAction.setSelectedTab(item));
  };

  const navigateToNextScreen = (screenName) => {
    navigation.navigate(screenName);
  };
  const USERTYPE = useSelector((state) => state.Auth.role);
  const Profile = useSelector((state) => state.Profile.data);

  // const USERTYPE = useSelector((state) => state.UserType.userType);

  const [isLogoutModalVisible, setisLogoutModalVisible] = React.useState(false);

  const [nearBy, setnearBy] = React.useState({
    textColor: COLORS.black,
    bgColor: COLORS.white,
  });

  const [tncView, setTncView] = React.useState({
    textColor: COLORS.black,
    bgColor: COLORS.white,
  });

  const [settingsView, setSettingsView] = React.useState({
    textColor: COLORS.black,
    bgColor: COLORS.white,
  });

  const [helpSupport, sethelpSupport] = React.useState({
    textColor: COLORS.black,
    bgColor: COLORS.white,
  });

  const [logOutView, setLogOutView] = React.useState({
    textColor: COLORS.black,
    bgColor: COLORS.white,
  });

  const logout = () => {
    toggleModal();
  };

  const toggleModal = () => {
    setisLogoutModalVisible(!isLogoutModalVisible);
  };

  const resetAction = CommonActions.reset({
    index: 0,
    routes: [{ name: SCREENS.Login }],
  });

  return (
    <View
      style={[
        STYLES.container,
        {
          flex: 1,
          backgroundColor: COLORS.white,
        },
      ]}
    >
      {/* Start of Top Container of User */}
      <MyTouchableOpacity
        activeOpacity={1}
        style={{
          paddingVertical: SIZES.fifteen,
        }}
        onPress={() => {
          navigation.toggleDrawer();
        }}
      >
        <Row style={[STYLES.drawerItem]}>
          <CircularImage
            image={{
              uri: CONSTANTS.API_CALLS.IMAGE_URL + Profile?.records?.image,
            }}
            style={{
              height: SIZES.fifty + 10,
              width: SIZES.fifty + 10,
              borderRadius: SIZES.fifty + 10,
            }}
            imageStyle={{
              height: SIZES.fifty + 10,
              width: SIZES.fifty + 10,
              borderRadius: SIZES.fifty + 10,
            }}
          />
          <View style={{ marginHorizontal: SIZES.ten }}>
            <Text style={[FONTS.mediumFont16, { color: COLORS.black }]}>
              {Profile?.records?.name}
            </Text>
            <Text
              numberOfLines={1}
              style={[FONTS.mediumFont12, { color: COLORS.brownGrey }]}
            >
              18/8/1999
            </Text>
          </View>
        </Row>
      </MyTouchableOpacity>
      {/* End of Top Container of User */}

      <View
        style={{
          paddingHorizontal: SIZES.ten,
          paddingTop: SIZES.ten,
        }}
      >
        {USERTYPE === "User" ? (
          <View>
            {/* Start of Near By Container */}
            <MyTouchableOpacity
              activeOpacity={1}
              style={[STYLES.drawerItem, { backgroundColor: nearBy.bgColor }]}
              onPressIn={() =>
                setnearBy({
                  textColor: COLORS.white,
                  bgColor: COLORS.primary1,
                })
              }
              onPressOut={() =>
                setnearBy({
                  textColor: COLORS.black,
                  bgColor: COLORS.white,
                })
              }
              onPress={() => {
                navigateToNextScreen(SCREENS.NearByMapView);
                //  navigation.toggleDrawer();
              }}
            >
              <Row style={{ alignSelf: "flex-start", alignItems: "center" }}>
                {/* <Icon
                  name={"location-outline"}
                  type={FONTFAMILY.Ionicons}
                  style={[STYLES.drawerIcon, { color: nearBy.textColor }]}
                /> */}
                <Text style={[STYLES.drawerText, { color: nearBy.textColor }]}>
                  Near By
                </Text>
              </Row>
            </MyTouchableOpacity>
            {/* End of Notifications Container */}
          </View>
        ) : null}

        {/* Start of Terms & Conditions Container */}
        <MyTouchableOpacity
          activeOpacity={1}
          style={[STYLES.drawerItem, { backgroundColor: tncView.bgColor }]}
          onPress={() => {
            navigateToNextScreen(SCREENS.TermsAndConditions);
            //  navigation.toggleDrawer();
          }}
          onPressIn={() =>
            setTncView({
              textColor: COLORS.white,
              bgColor: COLORS.primary1,
            })
          }
          onPressOut={() =>
            setTncView({
              textColor: COLORS.black,
              bgColor: COLORS.white,
            })
          }
        >
          <Row style={{ alignSelf: "flex-start", alignItems: "center" }}>
            <Icon
              name={"file"}
              type={FONTFAMILY.Octicons}
              style={[STYLES.drawerIcon, { color: tncView.textColor }]}
            />
            <Text style={[STYLES.drawerText, { color: tncView.textColor }]}>
              Terms & Conditions
            </Text>
          </Row>
        </MyTouchableOpacity>
        {/* End of Terms & Conditions Container */}

        {/* Start of About App  Container */}
        <MyTouchableOpacity
          activeOpacity={1}
          style={[STYLES.drawerItem, { backgroundColor: settingsView.bgColor }]}
          onPress={() => {
            navigateToNextScreen(SCREENS.AboutApp);
            //  navigation.toggleDrawer();
          }}
          onPressIn={() =>
            setSettingsView({
              textColor: COLORS.white,
              bgColor: COLORS.primary1,
            })
          }
          onPressOut={() =>
            setSettingsView({
              textColor: COLORS.black,
              bgColor: COLORS.white,
            })
          }
        >
          <Row style={{ alignSelf: "flex-start", alignItems: "center" }}>
            <Icon
              name={"exclamationcircleo"}
              type={FONTFAMILY.AntDesign}
              style={[STYLES.drawerIcon, { color: settingsView.textColor }]}
            />
            <Text
              style={[STYLES.drawerText, { color: settingsView.textColor }]}
            >
              About App
            </Text>
          </Row>
        </MyTouchableOpacity>
        {/* End of About App Container */}

        {/* Start of Help / Support  Container */}

        <MyTouchableOpacity
          activeOpacity={1}
          style={[STYLES.drawerItem, { backgroundColor: helpSupport.bgColor }]}
          onPress={() => {
            navigateToNextScreen(SCREENS.HelpAndSupport);
            //  navigation.toggleDrawer();
          }}
          onPressIn={() =>
            sethelpSupport({
              textColor: COLORS.white,
              bgColor: COLORS.primary1,
            })
          }
          onPressOut={() =>
            sethelpSupport({
              textColor: COLORS.black,
              bgColor: COLORS.white,
            })
          }
        >
          <Row style={{ alignSelf: "flex-start", alignItems: "center" }}>
            <Icon
              name={"questioncircleo"}
              type={FONTFAMILY.AntDesign}
              style={[STYLES.drawerIcon, { color: helpSupport.textColor }]}
            />
            <Text style={[STYLES.drawerText, { color: helpSupport.textColor }]}>
              Help/Support
            </Text>
          </Row>
        </MyTouchableOpacity>
        {/* End of Help / Support  Container */}

        {/* Start of Logout Container */}
        <MyTouchableOpacity
          activeOpacity={1}
          style={[
            STYLES.drawerItem,
            {
              backgroundColor: logOutView.bgColor,
            },
          ]}
          onPress={() => {
            logout();
          }}
          onPressIn={() =>
            setLogOutView({ textColor: COLORS.white, bgColor: COLORS.primary1 })
          }
          onPressOut={() =>
            setLogOutView({
              textColor: COLORS.black,
              bgColor: COLORS.white,
            })
          }
        >
          <Row style={{ alignSelf: "flex-start", alignItems: "center" }}>
            <Icon
              name={"logout"}
              type={FONTFAMILY.SimpleLineIcons}
              style={[STYLES.drawerIcon, { color: logOutView.textColor }]}
            />
            <Text style={[STYLES.drawerText, { color: logOutView.textColor }]}>
              Log Out
            </Text>
          </Row>
        </MyTouchableOpacity>
        {/* End of Logout Container */}
      </View>

      {/* Start of Logout Modal */}
      <Modal
        isVisible={isLogoutModalVisible}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={600}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}
      >
        <View
          style={{
            backgroundColor: COLORS.white,
            padding: SIZES.ten * 2,
            borderRadius: SIZES.ten,
            borderWidth: 1.5,
            borderColor: COLORS.primary1,
          }}
        >
          <Text
            style={[
              STYLES.headingText,
              {
                color: COLORS.primary1,
                marginTop: SIZES.five,
                textAlign: "center",
              },
            ]}
          >
            Photo Map
          </Text>
          <Text
            style={[
              STYLES.mediumText,
              { marginVertical: SIZES.twenty, textAlign: "center" },
            ]}
          >
            Are you sure you want to logout?
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <MyTouchableOpacity
              onPress={() => {
                toggleModal();
                dispatch(removeAccessToken());

                // setTimeout(() => {

                //   dispatch(removeAccessToken());
                //   // navigateToNextScreen(SCREENS.Login);
                // }, 700);
                //  navigation.toggleDrawer();
              }}
              style={{
                padding: SIZES.ten,
                width: SIZES.fifty,
                alignItems: "center",
                marginEnd: SIZES.five,
                backgroundColor: COLORS.primary1,
                borderRadius: SIZES.ten,
              }}
            >
              <Text style={[STYLES.mediumText, { color: COLORS.white }]}>
                Yes
              </Text>
            </MyTouchableOpacity>
            <MyTouchableOpacity
              onPress={() => toggleModal()}
              style={{
                padding: SIZES.ten,
                width: SIZES.fifty,
                alignItems: "center",
                marginStart: SIZES.five,
                backgroundColor: COLORS.primary1,
                borderRadius: SIZES.ten,
              }}
            >
              <Text style={[STYLES.mediumText, { color: COLORS.white }]}>
                No
              </Text>
            </MyTouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* End of Logout Modal */}
    </View>
  );
}

const styles = StyleSheet.create({});

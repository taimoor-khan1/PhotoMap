import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  Animated,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DrawerActions } from "@react-navigation/native";
import {
  COLORS,
  FONTFAMILY,
  FONTS,
  IMAGES,
  SCREENS,
  SIZES,
  STYLES,
  width,
} from "../../constants";
import { Icon } from "native-base";
import Home from "./../../screen/User/home/index";
import PortFolio from "../../screen/Vendor/portfolio";
import Profile from "./../../screen/User/profile/index";
import PhotographerProfile from "./../../screen/User/PhotographerProfile/PhotographerProfile";
import DrawerNavigator from "../drawer";

const Tab = createBottomTabNavigator();

export default function BottomBar({ route, navigation, drawerAnimation }) {
  const CustomIcon = ({ isFocused, type, seletedIcon, unSelectedIcon }) => {
    return (
      <View
        style={{
          padding: SIZES.ten - 2,
          borderRadius: SIZES.twenty * 2,
          borderWidth: 1,
          borderColor: isFocused ? COLORS.primary1 : COLORS.brownGrey,
        }}
      >
        <Icon
          name={isFocused ? seletedIcon : unSelectedIcon}
          type={type}
          style={{
            color: isFocused ? COLORS.primary1 : COLORS.brownGrey,
            fontSize: SIZES.twenty,

            // marginTop: 5,
          }}
        />
      </View>
    );
  };

  const CenterCustomIcon = ({
    isFocused,
    type,
    seletedIcon,
    unSelectedIcon,
    cart,
  }) => {
    return (
      <View
        style={{
          // top: -SIZES.ten,
          width: width * 0.12,
          height: width * 0.12,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: SIZES.twenty * 5,
          borderColor: isFocused ? COLORS.primary1 : COLORS.brownGrey,
          borderWidth: 1.5,
          backgroundColor: COLORS.white,
        }}
      >
        <Icon
          name={isFocused ? seletedIcon : unSelectedIcon}
          type={type}
          style={{
            color: isFocused ? COLORS.primary1 : COLORS.brownGrey,
            fontSize: SIZES.h24 + 5,
            position: "absolute",
          }}
        />
      </View>
    );
  };

  return (
    <Animated.View {...drawerAnimation}>
      <Tab.Navigator
        initialRouteName={SCREENS.Home}
        tabBarOptions={{
          showLabel: false,

          style: [
            STYLES.shadow,
            {
              position: "absolute",
              bottom: 0,
              zIndex: 10,
              width: width,
              height: SIZES.twenty * 4,
              borderTopLeftRadius: SIZES.twenty * 1.9,
              borderTopRightRadius: SIZES.twenty * 1.9,
              backgroundColor: COLORS.transparent,
              borderColor: COLORS.brownGrey,
              borderWidth: 0.5,
            },
          ],
        }}
      >
        <Tab.Screen //1
          name={SCREENS.Nearby}
          component={PhotographerProfile}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <CustomIcon
                isFocused={focused}
                type={FONTFAMILY.Ionicons}
                seletedIcon={"location-outline"}
                unSelectedIcon={"location-outline"}
              />
            ),
          }}
        />
        <Tab.Screen //2
          name={SCREENS.PortFolio}
          component={PortFolio}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <CustomIcon
                isFocused={focused}
                type={FONTFAMILY.Ionicons}
                seletedIcon={"ios-notifications-outline"}
                unSelectedIcon={"ios-notifications-outline"}
              />
            ),
          }}
        />

        <Tab.Screen //3
          name={SCREENS.Home}
          component={Home}
          options={{
            tabBarIcon: ({ color, focused }) => {
              return (
                <CenterCustomIcon
                  isFocused={focused}
                  type={FONTFAMILY.Ionicons}
                  seletedIcon={"home"}
                  unSelectedIcon={"home"}
                />
              );
            },
          }}
        />

        <Tab.Screen //4
          name={SCREENS.Profile}
          component={Profile}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <CustomIcon
                isFocused={focused}
                type={FONTFAMILY.SimpleLineIcons}
                seletedIcon={"user"}
                unSelectedIcon={"user"}
              />
            ),
          }}

          // listeners={({navigation, route}) => ({
          //   tabPress: e => {},
          // })}
        />
        <Tab.Screen //5
          name={SCREENS.More}
          component={ProfileProfile}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <CustomIcon
                isFocused={focused}
                type={FONTFAMILY.Ionicons}
                seletedIcon={"menu-outline"}
                unSelectedIcon={"menu-outline"}
              />
            ),
          }}
          // listeners={({ navigation }) => ({
          //   tabPress: (e) => {
          //     e.preventDefault();
          //     navigation.dispatch(DrawerActions.closeDrawer());
          //   },
          // })}
        />
      </Tab.Navigator>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  unselectedBottomBarIcon: {
    tintColor: COLORS.brownGrey,
    height: SIZES.twentyFive,
    width: SIZES.twentyFive,
  },
  selectedBottomBarIcon: {
    tintColor: COLORS.white,
    height: SIZES.twentyFive + 5,
    width: SIZES.twentyFive + 5,
  },
});

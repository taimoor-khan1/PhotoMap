import React, { useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { TransitionPresets } from "@react-navigation/stack";
import { useDispatch, useSelector } from "react-redux";

import { COLORS, SCREENS, SIZES } from "../../constants";
import DrawerScreen from "./DrawerScreen";
import Home from "../../screen/User/home";
import Profile from "../../screen/User/profile";
import Notifications from "../../screen/User/notifications/Notifications";
import Settings from "../../screen/User/settings/Settings";
import Animated from "react-native-reanimated";
import BottomBar from "./../bottombar/BottomBar";
import UserMainLayout from "../../screen/User/home/MainLayout";
import VendorMainLayout from "../../screen/Vendor/home/MainLayout";
import Support from "../../screen/User/content/Support";
import AboutApp from "../../screen/User/content/AboutApp";
import TermsAndConditions from "./../../screen/User/content/TermsAndConditions";
import NearByMapView from "../../screen/User/nearby/NearByMapView";
import AppliedJob from "../../screen/Vendor/AppliedJob";

import * as TabAction from "../../store/Action/TabAction";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator(props) {
  const USERTYPE = useSelector((state) => state.Auth.role);

  const dispatcher = useDispatch();
  const [progress, setProgress] = useState(new Animated.Value(0));

  // console.log("props.route.params.userType", props.route.params.userType);
  const scale = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });

  const borderRadius = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [1, 26],
  });

  const animatedStyle = { borderRadius, transform: [{ scale }] };

  useEffect(() => {
    // if (props.route.params.userType === "user") {
    //   setSelectestab(SCREENS.PostJob);
    // } else {
    //   setSelectestab(SCREENS.Home);
    // }
    if (USERTYPE === "User") {
      setSelectestab(SCREENS.PostJob);
    } else {
      setSelectestab(SCREENS.Home);
    }
  }, []);

  const setSelectestab = async (item) => {
    await dispatcher(TabAction.setSelectedTab(item));
  };

  return (
    <Drawer.Navigator
      initialRouteName={
        // props.route.params.userType === "user"
        USERTYPE === "User" ? SCREENS.UserMainLayout : SCREENS.VendorMainLayout
      }
      overlayColor={COLORS.transparent}
      drawerType={"slide"}
      drawerStyle={{
        width: "60%",
        backgroundColor: COLORS.transparent,
      }}
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        headerShown: false,
        gestureEnabled: true,
        swipeEnabled: false,
      }}
      drawerContent={(props) => {
        setTimeout(() => {
          setProgress(props.progress);
        }, 0);
        return <DrawerScreen {...props} drawerAnimation={animatedStyle} />;
      }}
    >
      <Drawer.Screen name={SCREENS.UserMainLayout}>
        {(props) => (
          <UserMainLayout {...props} drawerAnimation={animatedStyle} />
        )}
      </Drawer.Screen>

      <Drawer.Screen name={SCREENS.VendorMainLayout}>
        {(props) => (
          <VendorMainLayout {...props} drawerAnimation={animatedStyle} />
        )}
      </Drawer.Screen>

      {/* <Drawer.Screen name={SCREENS.BottomBar} component={BottomBar} /> */}

      <Drawer.Screen name={SCREENS.NearByMapView} component={NearByMapView} />
      <Drawer.Screen name={SCREENS.Notifications} component={Notifications} />
      <Drawer.Screen name={SCREENS.Profile} component={Profile} />
      <Drawer.Screen name={SCREENS.Settings} component={Settings} />
      <Drawer.Screen name={SCREENS.AppliedJob} component={AppliedJob} />
      <Drawer.Screen
        name={SCREENS.TermsAndConditions}
        component={TermsAndConditions}
      />
      <Drawer.Screen name={SCREENS.AboutApp} component={AboutApp} />
      <Drawer.Screen name={SCREENS.HelpAndSupport} component={Support} />
    </Drawer.Navigator>
  );
}

import React, { useState, useCallback, useRef, useEffect } from "react";
import { Icon } from "native-base";
import {
  FlatList,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Animated from "react-native-reanimated";
import {
  COLORS,
  FONTFAMILY,
  SIZES,
  STYLES,
  SCREENS,
  width,
  height,
} from "../../../constants";
import { useFocusEffect } from "@react-navigation/core";
import * as TabAction from "../../../store/Action/TabAction";
import { useSelector, useDispatch } from "react-redux";
import Notifications from "../notifications/Notifications";
import Home from ".";
import Profile from "../profile";
import NearByMapView from "../nearby/NearByMapView";
import PostJob from "./../postjob/index";

export default function MainLayout({ navigation, drawerAnimation }) {
  const dispatch = useDispatch();
  const [SELECTEDTAB, setSELECTEDTAB] = useState("");
  const flatlisref = useRef();

  // const navigation = useNavigation();
  const [translateValue] = useState(new Animated.Value(0));

  {
    /*Access Selected Tab from Selected Tab Reducer*/
  }

  // const SELECTEDTAB = useSelector((state) => state.TabRducer.selectedTab);

  {
    /*This Methood is used to Selection of Tab and Navigation*/
  }

  const onTabPressed = async (item) => {
    // await dispatch(TabAction.setSelectedTab(item));
    setSELECTEDTAB(item);
    switch (item) {
      case SCREENS.PostJob:
        flatlisref.current.scrollToIndex({
          index: 0,
          animated: true,
        });
        break;

      case SCREENS.Notifications:
        flatlisref.current.scrollToIndex({
          index: 2,
          animated: true,
        });
        break;
      case SCREENS.Home:
        flatlisref.current.scrollToIndex({
          index: 1,
          animated: true,
        });
        break;
      case SCREENS.Profile:
        flatlisref.current.scrollToIndex({
          index: 3,
          animated: true,
        });
        break;
    }
  };

  // console.log('SELECTEDTAB=================', navigation);

  const CustomIcon = ({
    isFocused,
    type,
    seletedIcon,
    onPress,
    unSelectedIcon,
  }) => {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <View
          style={{
            padding: SIZES.ten - 2,
            borderRadius: SIZES.twenty * 2,
            borderWidth: 1,
            borderColor: isFocused ? COLORS.primary1 : COLORS.brownGrey,
            backgroundColor: COLORS.transparent,
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
      </TouchableOpacity>
    );
  };
  const CenterCustomIcon = ({
    isFocused,
    type,
    seletedIcon,
    onPress,
    unSelectedIcon,
  }) => {
    return (
      <TouchableOpacity
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
          marginTop: SIZES.five,
        }}
        activeOpacity={0.7}
        onPress={onPress}
      >
        <Icon
          name={seletedIcon}
          type={type}
          style={{
            color: isFocused ? COLORS.primary1 : COLORS.brownGrey,
            fontSize: SIZES.h24 + 5,
            position: "absolute",
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <Animated.View
      //
      style={[
        {
          ...drawerAnimation,
          flex: 1,
          backgroundColor: COLORS.white,
        },
      ]}
    >
      {/* content */}
      <View style={{ flex: 1 }}>
        <FlatList
          ref={flatlisref}
          horizontal
          scrollEnabled={false}
          pagingEnabled
          snapToAlignment="center"
          snapToInterval={width}
          showsHorizontalScrollIndicator={false}
          style={{ backgroundColor: COLORS.black }}
          contentContainerStyle={{ backgroundColor: COLORS.black }}
          data={CATEGORIES}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  height: height,
                  width: width,
                }}
              >
                {item.screen === SCREENS.PostJob && <PostJob />}
                {item.screen === SCREENS.Home && <Home />}
                {item.screen === SCREENS.Notifications && <Notifications />}
                {item.screen === SCREENS.Profile && <Profile />}
              </View>
            );
          }}
        />
      </View>

      {/* footer */}

      {/* Tab */}

      <View
        style={[
          STYLES.shadow,
          {
            height: SIZES.twenty * 4.5,
            flexDirection: "row",
            paddingBottom: 10,
            paddingHorizontal: 20,
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: COLORS.white,
            borderTopLeftRadius: SIZES.twenty * 1.5,
            borderTopRightRadius: SIZES.twenty * 1.5,
          },
        ]}
      >
        <CustomIcon
          type={FONTFAMILY.Ionicons}
          unSelectedIcon={"home-outline"}
          seletedIcon={"home-sharp"}
          isFocused={SELECTEDTAB === SCREENS.Home ? true : false}
          onPress={() => {
            onTabPressed(SCREENS.Home);
          }}
        />
        <CustomIcon
          type={FONTFAMILY.Ionicons}
          seletedIcon={"notifications"}
          unSelectedIcon={"ios-notifications-outline"}
          isFocused={SELECTEDTAB === SCREENS.Notifications ? true : false}
          onPress={() => {
            onTabPressed(SCREENS.Notifications);
          }}
        />
        <CenterCustomIcon
          type={FONTFAMILY.Ionicons}
          seletedIcon={"add-outline"}
          unSelectedIcon={"add-outline"}
          isFocused={SELECTEDTAB === SCREENS.PostJob ? true : false}
          onPress={() => {
            onTabPressed(SCREENS.PostJob);
          }}
        />

        <CustomIcon
          type={FONTFAMILY.Ionicons}
          seletedIcon={"ios-person"}
          unSelectedIcon={"ios-person-outline"}
          isFocused={SELECTEDTAB === SCREENS.Profile ? true : false}
          onPress={() => {
            onTabPressed(SCREENS.Profile);
          }}
        />
        <CustomIcon
          type={FONTFAMILY.Ionicons}
          seletedIcon={"menu"}
          unSelectedIcon={"menu-outline"}
          // isFocused={SELECTEDTAB === SCREENS.DrawerNavigator ? true : false}
          onPress={() => {
            navigation.toggleDrawer();
          }}
        />
      </View>
    </Animated.View>
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
    width: SIZES.fiftyWidth * 1.75,
    height: SIZES.fiftyWidth * 2.2,
    borderColor: COLORS.crimson,
    borderWidth: 1,
    borderColor: COLORS.primary1,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "baseline",
    borderRadius: SIZES.twenty,
    marginHorizontal: SIZES.fifteen,
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

const CATEGORIES = [
  {
    id: "1",
    screen: SCREENS.PostJob,
  },
  {
    id: "2",
    screen: SCREENS.Home,
  },
  {
    id: "3",
    screen: SCREENS.Notifications,
  },
  {
    id: "4",
    screen: SCREENS.Profile,
  },
  {
    id: "5",
    screen: SCREENS.DrawerNavigator,
  },
];

const NEARBY = [
  {
    id: "0",
  },
  {
    id: "1",
  },
  {
    id: "2",
  },
  {
    id: "3",
  },
  {
    id: "4",
  },
  {
    id: "5",
  },
  {
    id: "6",
  },
  {
    id: "7",
  },
];

import React, { useState } from "react";
import {
  FlatList,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import NormalHeader from "../../../components/NormalHeader";
import { COLORS, FONTS, SIZES, STYLES } from "../../../constants";
import NotificationComponent from "../../../components/NotificationsComponant";
import { useSelector } from "react-redux";

export default function Notifications() {
  const NotificationData = useSelector((state) => state.Notification.data);
  // console.log("notification ly looooooooo", NotificationData);

  const [NotificationList, setNotificationList] = useState(NotificationData);

  React.useEffect(() => {
    setNotificationList(NotificationData);
  }, [NotificationData]);

  const deleteItem = (index) => {
    const arr = [...NotificationList];
    arr.splice(index, 1);
    setNotificationList(arr);
  };

  return (
    <View style={STYLES.container}>
      {/* <StatusBar backgroundColor={COLORS.white} barStyle={"dark-content"} /> */}

      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text style={[FONTS.boldFont22]}>Notifications</Text>
      </View>
      <FlatList
        data={NotificationList}
        keyExtractor={(Item) => Item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <NotificationComponent
              data={item}
              handleDelete={() => deleteItem(index)}
            />
          );
        }}
        contentContainerStyle={{
          marginTop: 20,
          paddingBottom: 150,
        }}
        // showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// const NotificationData = [
//   {
//     id: 1,
//     name:
//       "Duis aute irure Lorem ipsum dolor sit amet, consectetur elit, sed do...",
//     dayAgo: "Invite Friends - Get 3 coupons each!",
//     dec:
//       "It is a long established fact that a reader will be distracted by the readable content of apage when looking at its layout. The point of  ",
//   },
//   {
//     id: 2,
//     dayAgo: "Invite Friends - Get 3 coupons each!",
//     name:
//       "It is a long established fact that a reader will be distracted by the readable content of apage when looking at its layout. The point of  ",
//   },
//   {
//     id: 3,
//     name: "System",
//     dayAgo: "Invite Friends - Get 3 coupons each!",
//     dec:
//       "It is a long established fact that a reader will be distracted by the readable content of apage when looking at its layout. The point of  ",
//   },
//   {
//     id: 4,
//     name: "System",
//     dayAgo: "Invite Friends - Get 3 coupons each!",
//     dec:
//       "It is a long established fact that a reader will be distracted by the readable content of apage when looking at its layout. The point of  ",
//   },
//   {
//     id: 5,
//     name: "Promotion",
//     dayAgo: "Invite Friends - Get 3 coupons each!",
//     dec:
//       "It is a long established fact that a reader will be distracted by the readable content of apage when looking at its layout. The point of  ",
//   },
//   {
//     id: 6,
//     name: "Promotion",
//     dayAgo: "Invite Friends - Get 3 coupons each!",
//     dec:
//       "It is a long established fact that a reader will be distracted by the readable content of apage when looking at its layout. The point of  ",
//   },
//   {
//     id: 7,
//     name: "Promotion",
//     dayAgo: "Invite Friends - Get 3 coupons each!",
//     dec:
//       "It is a long established fact that a reader will be distracted by the readable content of apage when looking at its layout. The point of  ",
//   },
//   {
//     id: 8,
//     name: "Promotion",
//     dayAgo: "Invite Friends - Get 3 coupons each!",
//     dec:
//       "It is a long established fact that a reader will be distracted by the readable content of apage when looking at its layout. The point of  ",
//   },
//   {
//     id: 9,
//     name: "Promotion",
//     dayAgo: "Invite Friends - Get 3 coupons each!",
//     dec:
//       "It is a long established fact that a reader will be distracted by the readable content of apage when looking at its layout. The point of  ",
//   },
// ];

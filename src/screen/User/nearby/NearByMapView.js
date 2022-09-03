import React from "react";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import {
  COLORS,
  FONTFAMILY,
  FONTS,
  IMAGES,
  SCREENS,
  SIZES,
  width,
} from "../../../constants";
import Row from "../../../components/Row";
import BackArrow from "../../../components/BackArrow";
import { Icon } from "native-base";

const mapDarkStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#212121",
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#212121",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#bdbdbd",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#181818",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1b1b1b",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#2c2c2c",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#8a8a8a",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#373737",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#3c3c3c",
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry",
    stylers: [
      {
        color: "#4e4e4e",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#3d3d3d",
      },
    ],
  },
];

const mapStandardStyle = [
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
];

const NearByMapView = ({ navigation }) => {
  const theme = useTheme();

  const MarkerView = () => {
    return (
      <View
        style={{
          padding: SIZES.ten,
          borderRadius: SIZES.twenty * 2,
          backgroundColor: `${COLORS.red}20`,
        }}
      >
        <View
          style={{
            padding: SIZES.ten,
            borderRadius: SIZES.twenty * 2,
            backgroundColor: COLORS.redOpacity,
          }}
        >
          <View
            style={{
              height: SIZES.twenty,
              width: SIZES.twenty,
              borderRadius: SIZES.twenty * 100,
              backgroundColor: COLORS.red,
              borderWidth: 1,
              borderColor: COLORS.white,
              overflow: "hidden",
            }}
          >
            <Image
              style={{ height: "100%", width: "100%" }}
              source={IMAGES.user1}
            />
          </View>
        </View>
      </View>
    );
  };

  const CalloutView = () => {
    return (
      <Callout
        tooltip
        onPress={() => {
          navigation.navigate(SCREENS.PhotographerProfile);
        }}
        style={{
          backgroundColor: COLORS.white,
          flexDirection: "row",
          paddingHorizontal: SIZES.ten,
          paddingVertical: SIZES.five + 2,
          borderRadius: SIZES.ten,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 6,
          },
          shadowOpacity: 0.39,
          shadowRadius: 8.3,
          elevation: 13,
        }}
      >
        <View style={{ width: width * 0.3 }}>
          <Text
            style={[FONTS.mediumFont12, { color: COLORS.black }]}
            numberOfLines={1}
          >
            Henry Anderson
          </Text>
          <Text
            style={[FONTS.lightFont10, { color: COLORS.brownGrey }]}
            numberOfLines={1}
          >
            Adipsicing Eluit sed
          </Text>

          <Row
            style={{
              // marginTop: SIZES.five,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Row style={{ alignItems: "center" }}>
              <Icon
                name="star"
                type={FONTFAMILY.FontAwesome}
                style={{ color: COLORS.golden, fontSize: SIZES.twentyFive }}
              />

              <Text
                style={[
                  FONTS.lightFont12,
                  { color: COLORS.brownGrey, marginLeft: SIZES.five },
                ]}
              >
                4.0
              </Text>
            </Row>

            {/* <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginStart: SIZES.five,
              }}
            >
              <Icon
                name="directions"
                type={FONTFAMILY.MaterialCommunityIcons}
                style={{ color: COLORS.crimson, fontSize: SIZES.twentyFive }}
              />
              <Text
                style={[
                  FONTS.lightFont12,
                  { color: COLORS.brownGrey, marginLeft: SIZES.five - 2 },
                ]}
              >
                Direction
              </Text>
            </TouchableOpacity> */}
          </Row>
        </View>
      </Callout>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <MapView
        //   provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        customMapStyle={theme.dark ? mapDarkStyle : mapStandardStyle}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        {NearByData.map((item, index) => {
          return (
            <Marker
              pinColor="red"
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
              key={index}
            >
              <MarkerView />

              <CalloutView />
            </Marker>
          );
        })}
      </MapView>

      <View
        style={{
          position: "absolute",
          left: SIZES.fifteen,
          top: SIZES.twenty * 2,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <BackArrow />
        <Text style={[FONTS.mediumFont18, { marginLeft: width / 3.7 }]}>
          Near By
        </Text>
      </View>
    </View>
  );
};

export default NearByMapView;

const styles = StyleSheet.create({
  map: {
    height: "100%",
  },
  // Callout bubble
  bubble: {
    flexDirection: "column",
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 6,
    borderColor: "#ccc",
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },
  // Arrow below the bubble
  arrow: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#fff",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#007a87",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -0.5,
    // marginBottom: -15
  },
  // Character name
  name: {
    fontSize: 16,
    marginBottom: 5,
  },
  // Character image
  image: {
    height: SIZES.fifty,
    width: SIZES.twentyFive + SIZES.ten,
    backgroundColor: "red",
  },
});

const NearByData = [
  {
    id: 1,
    latitude: 37.78825,
    longitude: -122.4324,
  },
  {
    id: 2,
    latitude: 37.7899999,
    longitude: -122.4358,
  },
];

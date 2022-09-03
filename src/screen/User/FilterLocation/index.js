import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { COLORS, FONTFAMILY, SIZES, STYLES } from "../../../constants/index";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Icon } from "native-base";
import { useDispatch } from "react-redux";

import NormalHeader from "../../../components/WalletHeader";
import * as FilterSearchAction from "../../../store/Action/SearchAction";

export default function SearchFilter({ navigation }) {
  const dispatcher = useDispatch();
  const [placeHolder, setplaceHolder] = useState("Enter Location");

  const getLocation = async (address, location) => {
    let data = {
      address: address,
      location: location,
    };
    // console.log("data=======", data);
    await dispatcher(FilterSearchAction.setSearchLocation(data));
    await dispatcher(FilterSearchAction.setShowFilterBottomSheet(true));
  };
  const GooglePlacesInput = (props) => {
    return (
      <GooglePlacesAutocomplete
        placeholder={placeHolder}
        onPress={(data, details = null) => {
          // setstartLocation(data.description)
          getLocation(details.formatted_address, details.geometry.location);
          setTimeout(() => {
            navigation.goBack();
          }, 500);
        }}
        query={{
          key: "AIzaSyC-MPat5umkTuxfvfqe1FN1ZMSafBpPcpM",
          language: "en",
          //   components: "country:us",
        }}
        currentLocation={true}
        GooglePlacesSearchQuery={{ rankby: "distance" }}
        GooglePlacesDetailsQuery={{ fields: ["formatted_address", "geometry"] }}
        renderDescription={(row) => row.description}
        currentLocationLabel="Current location"
        enablePoweredByContainer={false}
        keepResultsAfterBlur={true}
        nearbyPlacesAPI="GooglePlacesSearch"
        fetchDetails
        renderLeftButton={() => (
          <View
            style={{
              height: SIZES.ten,
              width: SIZES.ten,
              borderRadius: SIZES.ten,
              backgroundColor: COLORS.crimson,
              marginBottom: SIZES.five - 2,
              alignSelf: "center",
              marginLeft: SIZES.five,
            }}
          />
        )}
        renderRightButton={() => (
          <Icon
            type={FONTFAMILY.Ionicons}
            name={"search"}
            style={{ color: COLORS.crimson, fontSize: SIZES.twenty + 5 }}
          />
        )}
        styles={{
          container: {
            // backgroundColor: 'red',
            alignItems: "center",
          },
          row: {
            backgroundColor: COLORS.transparent,
          },
          textInputContainer: {
            backgroundColor: "white",
            alignItems: "center",
            paddingHorizontal: SIZES.twenty,
            borderColor: COLORS.darkBlueGrey,
            borderWidth: 0.5,
            borderRadius: SIZES.ten,
            paddingTop: SIZES.five,
          },
          textInput: [
            {
              color: COLORS.BLACK,
              flex: 1,
              fontFamily: FONTFAMILY.Medium,
              fontSize: SIZES.h20,
              textTransform: "capitalize",
              paddingTop: SIZES.fifteen - 5,
            },
          ],
          listView: {
            marginVertical: SIZES.twenty,
            backgroundColor: COLORS.transparent,
          },
          separator: {
            borderColor: COLORS.grey,
            borderBottomWidth: 0.8,
            backgroundColor: COLORS.transparent,
          },
          description: {
            backgroundColor: COLORS.transparent,
          },
        }}
      />
    );
  };
  return (
    <View style={[STYLES.container, { backgroundColor: COLORS.white }]}>
      <NormalHeader title={"Filter Search"} />
      <View
        style={[
          {
            flex: 1,
            paddingHorizontal: SIZES.twenty + 5,
            marginTop: SIZES.ten,
          },
        ]}
      >
        <GooglePlacesInput />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});

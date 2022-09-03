import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  TextInput,
} from "react-native";
import NormalHeader from "../../../components/NormalHeader";
import {
  COLORS,
  CONSTANTS,
  FONTFAMILY,
  FONTS,
  IMAGES,
  SCREENS,
  SIZES,
  STYLES,
} from "../../../constants";
import ImagePicker from "react-native-image-crop-picker";
import EditText from "../../../components/EditText";
import { getStatusBarHeight } from "react-native-status-bar-height";
import CountryPicker from "react-native-country-picker-modal";
import { Icon } from "native-base";
import LinearGradient from "react-native-linear-gradient";
import CircularImage from "../../../components/CircularImage";
import ButtonRadius10 from "../../../components/ButtonRadius10";
import Card from "../../../components/Card";
import UploadPhotoModal from "../../../components/modals/UploadPhotoModal";
import Row from "../../../components/Row";
import UserImageWithCrown from "../../../components/UserImageWithCrown";
import MessageEditText from "../../../components/MessageEditText";
import axios from "axios";
import { store } from "../../../redux/store";
import utils from "../../../utils";

export default function EditProfile(props) {
  const [isCountryCodePickerVisible, setisCountryCodePickerVisible] = useState(
    false
  );
  const [visibility, setVisibility] = useState(false);
  const [countryCode, setCountryCode] = useState("1");
  const [countryFlag, setcountryFlag] = useState("US");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [aboutme, setAboutme] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [startingFrom, setStartingFrom] = useState("");
  const [borderColor, setBorderColor] = useState(COLORS.blackWithOpacity);
  const [completePhone, setCompletePhone] = useState(countryCode + phone);

  const toggleIsCountryCodePickerVisible = () => {
    setisCountryCodePickerVisible(!isCountryCodePickerVisible);
  };

  const onSelect = (country) => {
    setCountryCode(country.callingCode[0]);
    setcountryFlag(country.cca2);
  };

  const updateProfile = () => {
    const data = {
      name: name,
      email: email,
      phone: completePhone,
      address: address,
      about_me: aboutme,
      price: startingFrom,
      image: image,
    };
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }
    axios
      .post(
        CONSTANTS.API_CALLS.BASE_URL +
          CONSTANTS.API_CALLS.VENDOR_UPDATE_PROFILE,
        formData,
        {
          headers: {
            Authorization: store.getState().Auth.accessToken,
          },
        }
      )
      .then(
        (response) => utils.successAlert(response.data.message),
        props.navigation.goBack()
      )
      .catch((err) => {
        const error = utils.showResponseError(err);
        utils.errorAlert(error);
      });
  };

  return (
    <View style={[STYLES.container, {}]}>
      {/* <StatusBar backgroundColor={COLORS.secondary} barStyle={'dark-content'} /> */}
      <NormalHeader title="Edit Profile" />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View>
          <UserImageWithCrown
            style={{ marginVertical: SIZES.ten }}
            image={image}
          />
          <LinearGradient
            start={{ x: 0.0, y: 0.25 }}
            end={{ x: 0.5, y: 1.0 }}
            colors={[COLORS.red, COLORS.crimson]}
            style={{
              padding: SIZES.five,
              borderRadius: SIZES.twenty,
              position: "absolute",
              bottom: SIZES.ten,
              left: SIZES.twenty * 2.5,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                setVisibility(true);
              }}
            >
              <Icon
                type={FONTFAMILY.Ionicons}
                name={"camera-outline"}
                style={{ fontSize: SIZES.twenty, color: COLORS.white }}
              />
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
      <Text
        style={[
          FONTS.mediumFont16,
          { paddingLeft: SIZES.fifteen, marginBottom: SIZES.ten },
        ]}
      >
        Account Details
      </Text>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
          borderTopLeftRadius: SIZES.ten,
          borderTopRightRadius: SIZES.ten,
          paddingHorizontal: SIZES.twenty,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{}}>
          <Text
            style={[
              FONTS.mediumFont12,
              { color: COLORS.primary1, marginBottom: SIZES.fifteen },
            ]}
          >
            Full Name
          </Text>

          <EditText
            placeholder="Enter Name"
            hasIcon
            value={name}
            onChangeText={(text) => {
              setName(text);
            }}
            name="user"
            type={FONTFAMILY.AntDesign}
          />
        </View>

        {/* aboute Me View start */}
        <View style={{ marginTop: SIZES.fifteen * 1.5 }}>
          <Text
            style={[
              FONTS.mediumFont14,
              { color: COLORS.primary1, marginBottom: SIZES.fifteen },
            ]}
          >
            About Me
          </Text>

          <MessageEditText
            placeholder="About me"
            value={aboutme}
            onChangeText={(text) => {
              setAboutme(text);
            }}
          />
        </View>
        {/* aboute Me View start */}

        <View style={{ marginTop: SIZES.twentyFive }}>
          <Text
            style={[
              FONTS.mediumFont12,
              { color: COLORS.primary1, marginBottom: SIZES.fifteen },
            ]}
          >
            Phone No.
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              height: 60,
              borderRadius: SIZES.twenty,
              borderWidth: 1,
              borderColor: borderColor,
              justifyContent: "space-between",
            }}
            activeOpacity={1}
          >
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => toggleIsCountryCodePickerVisible()}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: SIZES.fifteen,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <CountryPicker
                  onSelect={onSelect}
                  countryCode={countryFlag}
                  visible={isCountryCodePickerVisible}
                  withCallingCode
                  theme={{
                    fontFamily: FONTFAMILY.Medium,
                    resizeMode: "contain",
                  }}
                />
                <Text style={[FONTS.mediumFont14, { color: COLORS.BLACK }]}>
                  +{countryCode}
                </Text>
                <Icon
                  type={FONTFAMILY.Ionicons}
                  name={"chevron-down"}
                  style={{
                    color: COLORS.BLACK,
                    fontSize: 20,
                    marginLeft: SIZES.five,
                  }}
                />
              </View>
            </TouchableOpacity>
            <TextInput
              selectionColor={COLORS.primary1}
              placeholderTextColor={COLORS.blackWithOpacity}
              placeholder="Enter Phone Number"
              value={phone}
              onChangeText={(text) => {
                setPhone(text);
              }}
              style={[
                FONTS.mediumFont14,
                {
                  flex: 1,
                  color: COLORS.black,
                },
              ]}
              onFocus={() => {
                setBorderColor(COLORS.primary1);
              }}
              onBlur={() => {
                setBorderColor(COLORS.blackWithOpacity);
              }}
            />
          </View>
        </View>

        <View style={{ marginTop: SIZES.twentyFive }}>
          <Text
            style={[
              FONTS.mediumFont12,
              { color: COLORS.primary1, marginBottom: SIZES.fifteen },
            ]}
          >
            Address
          </Text>

          <EditText
            placeholder="Enter Address"
            hasIcon
            value={address}
            onChangeText={(text) => {
              setAddress(text);
            }}
            name="location-pin"
            type={FONTFAMILY.SimpleLineIcons}
          />
        </View>
        <View style={{ marginTop: SIZES.twentyFive }}>
          <Text
            style={[
              FONTS.mediumFont12,
              { color: COLORS.primary1, marginBottom: SIZES.fifteen },
            ]}
          >
            Starting From
          </Text>

          <EditText
            value={startingFrom}
            onChangeText={(text) => {
              setStartingFrom(text);
            }}
            placeholder="Starting from"
            hasIcon
            name="dollar"
            type={FONTFAMILY.FontAwesome}
          />
        </View>

        <ButtonRadius10
          label={"Save & Continue"}
          style={{ marginVertical: SIZES.twenty * 3 }}
          onPress={() => {
            updateProfile();
            // props.navigation.goBack();
          }}
        />
      </ScrollView>

      <UploadPhotoModal
        visibility={visibility}
        setVisibility={setVisibility}
        isCircle
        onImageSelected={(image) => {
          setImage(image);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
});

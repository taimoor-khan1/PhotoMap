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
import { useSelector } from "react-redux";
import axios from "axios";
import { store } from "../../../redux/store";
import utils from "../../../utils";

export default function EditProfile(props) {
  const USERDATA = useSelector((state) => state.Profile.data);

  const [isCountryCodePickerVisible, setisCountryCodePickerVisible] = useState(
    false
  );
  const [visibility, setVisibility] = useState(false);
  const [name, setName] = useState("abc");
  const [email, setEmail] = useState("def");
  const [address, setAddress] = useState("ghi");
  const [countryCode, setCountryCode] = useState("1");
  const [phone, setphone] = useState("555");
  const [completePhone, setCompletePhone] = useState(countryCode + "555");
  const [countryFlag, setcountryFlag] = useState("US");
  const [image, setImage] = useState("");
  const [borderColor, setBorderColor] = useState(COLORS.blackWithOpacity);
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
      image: image,
    };
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }
    axios
      .post(
        CONSTANTS.API_CALLS.BASE_URL + CONSTANTS.API_CALLS.UPDATE_PROFILE,
        formData,
        {
          headers: {
            Authorization: store.getState().Auth.accessToken,
          },
        }
      )
      .then((response) =>
        // console.log(response)
        utils.successAlert(response)
      )
      .catch((err) => {});
  };

  return (
    <View style={[STYLES.container, {}]}>
      {/* <StatusBar backgroundColor={COLORS.secondary} barStyle={'dark-content'} /> */}
      <NormalHeader title="Edit Profile" />

      <ScrollView
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
          borderTopLeftRadius: SIZES.twentyFive,
          borderTopRightRadius: SIZES.twentyFive,
          paddingHorizontal: SIZES.twenty,
          marginTop: SIZES.twenty,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.34,
          shadowRadius: 6.27,

          elevation: 10,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Row
          style={{
            alignItems: "center",
            marginTop: SIZES.twenty,
          }}
        >
          <View>
            <CircularImage
              image={
                image || {
                  uri: CONSTANTS.API_CALLS.IMAGE_URL + USERDATA?.records?.image,
                }
              }
              style={{
                height: SIZES.twenty * 3.6,
                width: SIZES.twenty * 3.6,
                alignItems: "center",
                justifyContent: "center",
              }}
            />

            <TouchableOpacity
              style={{
                height: SIZES.fifty * 0.45,
                width: SIZES.fifty * 0.45,
                borderRadius: SIZES.fifty * 0.45,
                position: "absolute",
                bottom: 2.5,
                right: 2.5,
                backgroundColor: COLORS.primary1,
                alignItems: "center",
                justifyContent: "center",
              }}
              activeOpacity={0.7}
              onPress={() => {
                setVisibility(true);
              }}
            >
              <Icon
                name={"camera"}
                type={FONTFAMILY.EvilIcons}
                style={{ fontSize: SIZES.twentyFive, color: COLORS.white }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ marginHorizontal: SIZES.ten }}>
            <Text style={[FONTS.mediumFont14, { color: COLORS.black }]}>
              {USERDATA?.records?.name}
            </Text>
            <Text style={[FONTS.lightFont10, { color: COLORS.primary1 }]}>
              {USERDATA?.records?.address}
            </Text>
          </View>
        </Row>
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
            value={name}
            onChangeText={(text) => {
              setName(text);
            }}
            placeholder="Enter Name"
            hasIcon
            name="user"
            type={FONTFAMILY.AntDesign}
          />
        </View>

        <View style={{ marginTop: SIZES.twentyFive }}>
          <Text
            style={[
              FONTS.mediumFont12,
              { color: COLORS.primary1, marginBottom: SIZES.fifteen },
            ]}
          >
            Email
          </Text>

          <EditText
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
            placeholder="Enter Email"
            hasIcon
            name="mail"
            type={FONTFAMILY.AntDesign}
          />
        </View>

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
              value={phone}
              onChangeText={(text) => {
                setphone(text);
              }}
              selectionColor={COLORS.primary1}
              placeholderTextColor={COLORS.blackWithOpacity}
              placeholder="Enter Phone Number"
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
            value={address}
            onChangeText={(text) => {
              setAddress(text);
            }}
            placeholder="Enter Address"
            hasIcon
            name="location-pin"
            type={FONTFAMILY.SimpleLineIcons}
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

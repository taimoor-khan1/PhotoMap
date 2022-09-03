import React, { useMemo, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ImageBackground,
  FlatList,
  ScrollView,
  Modal,
  TouchableOpacity,
} from "react-native";
import MasonryList from "@react-native-seoul/masonry-list";
import { SharedElement } from "react-navigation-shared-element";
import DatePicker from "react-native-date-picker";
import moment from "moment";
import { Icon } from "native-base";

import NormalHeader from "../../../components/NormalHeader";
import UserImageWithCrown from "../../../components/UserImageWithCrown";
import Card from "../../../components/Card";
import Row from "../../../components/Row";
import MyTouchableOpacity from "../../../components/MyTouchableOpacity";
import ButtonRadius10 from "../../../components/ButtonRadius10";
import LinearGradient from "react-native-linear-gradient";

// =======================redux==========================
import { useDispatch, useSelector } from "react-redux";
import { show, hide } from "../../../redux/Silices/Loader";
import { SinglePhotoGrapher } from "../../../redux/Silices/Photographers";
import LottieView from "lottie-react-native";
import {
  COLORS,
  CONSTANTS,
  FONTFAMILY,
  FONTS,
  IMAGES,
  SCREENS,
  SIZES,
  STYLES,
  width,
} from "../../../constants";
import Loader from "../../../components/modals/Loader";

export default function PhotographerProfile(props) {
  const dispatcher = useDispatch();
  const { navigation, route } = props;
  const { vendorID } = route?.params;
  const [timePickerModal, settimePickerModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showtext, setshowtext] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [newTime, setminut] = useState("");
  const PROFLIEDATA = useSelector((state) => state.Profile.data);
  // const data = useSelector((state) => state.Photographers.SingleData);
  const [data, setData] = useState(null);

  useEffect(() => {
    getSingleProfile(vendorID);
  }, []);

  const getSingleProfile = async (vendorID) => {
    await dispatcher(SinglePhotoGrapher(vendorID))
      .unwrap()
      .then((resp) => {
        setData(resp);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
      });
  };

  const renderFiltersItem = ({ item }) => {
    // const randomHeight = useMemo(() => Math.random() < 0.5, []);
    return (
      // <SharedElement id={item.id}>
      <MyTouchableOpacity
        onPress={() => {
          navigation.navigate(SCREENS.PortFolio, {
            item: item,
          });
        }}
        key={item.id}
        style={{
          height: SIZES.fiftyWidth * 2.3,
          // randomHeight
          //   ? SIZES.fiftyWidth * 2.3
          //   : SIZES.fiftyWidth * 5.5,
          flex: 1,
          overflow: "hidden",
          margin: 5,
        }}
      >
        <ImageBackground
          source={{
            uri:
              CONSTANTS.API_CALLS.IMAGE_URL + /public/ + item?.portfolio?.image,
          }}
          // source={IMAGES.ImageParty}
          style={{
            flex: 1,
            // width: SIZES.fiftyWidth * 1.5,
            // justifyContent: "center",
            // alignItems: "center",
          }}
          imageStyle={{
            borderRadius: SIZES.fifteen,
          }}
        />
      </MyTouchableOpacity>
      // </SharedElement>
    );
  };

  return (
    <View style={STYLES.container}>
      {/* <StatusBar backgroundColor={COLORS.secondary} barStyle={'dark-content'} /> */}

      <NormalHeader title={"Mrs. " + data?.users[0].name} />

      <ScrollView
        style={{ marginTop: SIZES.ten }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={{ flex: 1, paddingHorizontal: SIZES.fifteen }}>
          <Text
            style={[
              FONTS.mediumFont16,
              {
                color: COLORS.red,
                alignSelf: "center",
                marginTop: SIZES.ten,
              },
            ]}
          >
            Party
          </Text>

          <Card
            style={{
              backgroundColor: COLORS.secondary,
              marginTop: SIZES.twentyFive * 2,
              borderRadius: SIZES.ten,
            }}
          >
            <UserImageWithCrown
              style={{
                alignSelf: "center",
                marginTop: -SIZES.twentyFive * 1.5,
              }}
            />
            <Row
              style={{
                justifyContent: "space-between",
                marginVertical: SIZES.fifteen,
                paddingHorizontal: SIZES.fifteen,
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Text
                  style={[
                    FONTS.mediumFont14,
                    { color: COLORS.brownGrey, marginBottom: SIZES.ten },
                  ]}
                >
                  Followers
                </Text>
                <Text style={[FONTS.boldFont20, { color: COLORS.black }]}>
                  {data?.followers_count}
                </Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text
                  style={[
                    FONTS.mediumFont14,
                    { color: COLORS.brownGrey, marginBottom: SIZES.ten },
                  ]}
                >
                  Projects
                </Text>
                <Text style={[FONTS.boldFont20, { color: COLORS.black }]}>
                  {data?.projects}
                </Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text
                  style={[
                    FONTS.mediumFont14,
                    { color: COLORS.brownGrey, marginBottom: SIZES.ten },
                  ]}
                >
                  Ratings
                </Text>
                <Text style={[FONTS.boldFont20, { color: COLORS.black }]}>
                  {data?.users[0]?.ratings}
                </Text>
              </View>
            </Row>

            <View
              style={{
                backgroundColor: COLORS.paleGrey,
                borderRadius: SIZES.ten,
                marginVertical: SIZES.fifteen,
                paddingHorizontal: SIZES.five,
                marginHorizontal: SIZES.ten,
              }}
            >
              <Row
                style={{
                  marginVertical: SIZES.ten,
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text
                    style={[FONTS.mediumFont12, { color: COLORS.brownGrey }]}
                  >
                    Starting from
                  </Text>
                  <Text
                    style={[
                      FONTS.boldFont20,
                      { color: COLORS.black, marginVertical: SIZES.ten },
                    ]}
                  >
                    {data?.users[0]?.price}
                  </Text>
                </View>
                <View style={{ marginHorizontal: SIZES.twenty }}>
                  <Text
                    style={[FONTS.mediumFont12, { color: COLORS.brownGrey }]}
                  >
                    Address
                  </Text>
                  <Text
                    style={[
                      FONTS.boldFont16,
                      { color: COLORS.black, marginVertical: SIZES.ten },
                    ]}
                  >
                    {data?.users[0]?.address}
                  </Text>
                </View>
                {/* <Text style={[FONTS.mediumFont12, { color: COLORS.red }]}>
                  
                </Text> */}
                {/* <View
                  style={{
                    height: "100%",
                    width: 0.75,
                    backgroundColor: COLORS.brownGrey,
                    marginHorizontal: SIZES.fifteen,
                  }}
                />

                <View style={{ flex: 1 }}>
                  <Text
                    style={[FONTS.mediumFont12, { color: COLORS.brownGrey }]}
                  >
                    Recent Projects
                  </Text>
                  <Row
                    style={{
                      marginTop: SIZES.ten,
                      justifyContent: "space-between",
                    }}
                  >
                    <ImageBackground
                      source={IMAGES.ImageParty}
                      style={{
                        height: SIZES.fiftyWidth * 1.1,
                        width: SIZES.fiftyWidth * 1.1,
                      }}
                      imageStyle={{
                        borderRadius: SIZES.fifteen,
                      }}
                    />
                    <ImageBackground
                      source={IMAGES.ImageParty}
                      style={{
                        height: SIZES.fiftyWidth * 1.1,
                        width: SIZES.fiftyWidth * 1.1,
                      }}
                      imageStyle={{
                        borderRadius: SIZES.fifteen,
                      }}
                    />
                    <ImageBackground
                      source={IMAGES.ImageParty}
                      style={{
                        height: SIZES.fiftyWidth * 1.1,
                        width: SIZES.fiftyWidth * 1.1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      imageStyle={{
                        borderRadius: SIZES.fifteen,
                      }}
                      blurRadius={5}
                    >
                      <Text
                        style={[FONTS.lightFont14, { color: COLORS.white }]}
                      >
                        +337
                      </Text>
                    </ImageBackground>
                  </Row>
                </View> */}
              </Row>
            </View>
            <Row
              style={{
                justifyContent: "space-between",
                marginHorizontal: SIZES.fifteen,
              }}
            >
              <Text style={[FONTS.boldFont20, { color: COLORS.black }]}>
                About Me
              </Text>

              <MyTouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={() => {
                  navigation.navigate(SCREENS.AllReviews, { item: data });
                }}
              >
                <Text style={[FONTS.mediumFont12, { color: COLORS.red }]}>
                  View All Reviews
                </Text>
                <Icon
                  type={FONTFAMILY.Entypo}
                  name={"chevron-right"}
                  style={{ fontSize: SIZES.twenty - 3, color: COLORS.red }}
                />
              </MyTouchableOpacity>
            </Row>
            <Text
              style={[
                FONTS.mediumFont12,
                {
                  color: COLORS.brownGrey,
                  marginHorizontal: SIZES.fifteen,
                  marginTop: SIZES.ten,
                  marginBottom: SIZES.fifteen,
                },
              ]}
            >
              Hi! I'm specialize in fashion photography. I like beige tones &
              girl of different complexion, Work since 2010.
            </Text>
          </Card>

          <View
            style={{
              flex: 1,
              marginHorizontal: SIZES.fifteen,
              marginVertical: SIZES.twenty,
            }}
          >
            <Text style={[FONTS.boldFont20, { color: COLORS.black }]}>
              Portfolio
            </Text>
            <View style={{ flex: 1 }}>
              <MasonryList
                // style={{ alignSelf: "stretch" }}
                contentContainerStyle={{
                  // paddingHorizontal: 10,
                  paddingBottom: 200,
                  alignSelf: "stretch",
                }}
                numColumns={2}
                data={data?.users || filters}
                renderItem={renderFiltersItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <Row
        style={{
          position: "absolute",
          bottom: 20,
          justifyContent: "space-between",
          alignSelf: "center",
        }}
      >
        <Card
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: COLORS.darkSlateBlue,
            borderRadius: SIZES.twenty,
          }}
        >
          <MyTouchableOpacity
            style={{
              height: 60,
              width: 60,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon
              type={FONTFAMILY.Ionicons}
              name={"ios-person-add-outline"}
              style={{ fontSize: SIZES.twentyFive, color: COLORS.white }}
            />
          </MyTouchableOpacity>
        </Card>
        <ButtonRadius10
          label={"Book Now"}
          style={{ width: "75%" }}
          onPress={() => {
            settimePickerModal(!timePickerModal);
          }}
        />
      </Row>

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={timePickerModal}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            settimePickerModal(!timePickerModal);
          }}
          statusBarTranslucent
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text
                style={[FONTS.mediumFont16, { marginVertical: SIZES.twenty }]}
              >
                Select Date And Time
              </Text>
              <DatePicker
                fadeToColor="none"
                androidVariant="iosClone" // “iosClone” & “nativeAndroid”
                mode="datetime"
                minimumDate={date}
                date={date}
                onDateChange={(text) => {
                  setDate(text);
                  // console.log(
                  //   'text====================>>>>>>>',
                  //   moment(text).add(15, 'm').format('hh:mm:ss'),
                  // );
                  // let mtext = text;
                  // props.setdate(moment(text).format('D MMM YYYY'));
                  setminut(moment(text).add(15, "m").format("hh:mm A"));
                  // props.settime(moment(text).format('hh:mm A'));
                }}
                style={{
                  justifyContent: "space-between",
                  // alignSelf: 'center',
                  // width: SIZES.twenty * 24,
                  // height: SIZES.twenty * 15,
                }}
              />

              <LinearGradient
                colors={[COLORS.primary1, COLORS.crimson]}
                style={{
                  borderRadius: SIZES.ten,
                  marginTop: SIZES.ten,
                  alignSelf: "flex-end",
                }}
              >
                <TouchableOpacity
                  style={{
                    paddingHorizontal: SIZES.twenty,
                    paddingVertical: SIZES.ten,
                  }}
                  onPress={() => {
                    settimePickerModal(false);
                    setTimeout(() => {
                      navigation.navigate(SCREENS.BookingDetails, {
                        date,
                        data,
                      });
                    });
                  }}
                >
                  <Text
                    style={[
                      FONTS.boldFont18,
                      {
                        color: COLORS.white,
                        textAlign: "center",
                      },
                    ]}
                  >
                    OK
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        </Modal>
      </View>

      <Loader visibility={isLoading} />
    </View>
  );
}

const filters = [
  {
    id: "1",
    name: "Cinematic",
    image: IMAGES.ImageParty,
  },
  {
    id: "2",
    name: "Motion Blur",
    image: IMAGES.ImageParty,
  },
  {
    id: "3",
    name: "Glitch",
    image: IMAGES.ImageParty,
  },
  {
    id: "4",
    name: "Neon",
    image: IMAGES.ImageParty,
  },
  {
    id: "5",
    name: "Cinematic",
    image: IMAGES.ImageParty,
  },
  {
    id: "6",
    name: "Motion Blur",
    image: IMAGES.ImageParty,
  },
  {
    id: "7",
    name: "Glitch",
    image: IMAGES.ImageParty,
  },
  {
    id: "8",
    name: "Neon",
    image: IMAGES.ImageParty,
  },
  {
    id: "9",
    name: "Cinematic",
    image: IMAGES.ImageParty,
  },
  {
    id: "10",
    name: "Motion Blur",
    image: IMAGES.ImageParty,
  },
];

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
    backgroundColor: COLORS.blackWithOpacity,
    paddingHorizontal: SIZES.twenty,
  },
  modalView: {
    backgroundColor: COLORS.white,
    alignItems: "center",
    borderRadius: SIZES.ten,
    padding: SIZES.ten,
    // justifyContent: 'center',
  },
});

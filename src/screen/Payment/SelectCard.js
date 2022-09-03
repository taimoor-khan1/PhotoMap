import React, { useRef, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  STYLES,
  SIZES,
  SCREENS,
  COLORS,
  FONTFAMILY,
  FONTS,
  height,
  width,
  IMAGES,
  CONSTANTS,
} from "../../constants/theme";
import NormalHeader from "../../components/NormalHeader";
import { Icon } from "native-base";
import MyTouchableOpacity from "../../components/MyTouchableOpacity";
import Carousel from "react-native-snap-carousel";
import ButtonRadius10 from "../../components/ButtonRadius10";

import { store } from "../../redux/store";
import axios from "axios";
import moment from "moment";
import utils from "../../utils";
import Loader from "../../components/modals/Loader";
import { Cards } from "../../redux/Silices/Cards";
import { useDispatch, useSelector } from "react-redux";
import { BookingDetail } from "../../redux/Silices/BookingDetail";

export default function SelectCard(props) {
  const dispatcher = useDispatch();
  // const cards = useSelector((state) => state.Cards.data);

  const [isLoading, setIsLoading] = useState(true);
  const { route, navigation } = props;
  const { date, data } = route?.params;
  const [selectedCard, setSelectedCard] = useState("123456789111");
  const [cards, setCards] = useState();
  const Cref = useRef();

  useEffect(() => {
    getCards();
  }, []);

  ////////////////////get cards//////////////////
  const getCards = async () => {
    await dispatcher(Cards(""))
      .unwrap()
      .then((resp) => {
        setCards(resp);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
      });
  };

  ////////////////////////////////////confirm booking////////////////
  const ConfirmBooking = () => {
    if (
      selectedCard === null ||
      selectedCard === "" ||
      selectedCard === undefined
    ) {
      utils.errorAlert("Kinldy pick a Card");
    } else {
      const postdata = {
        booking_date: moment(date).format("YYYY-MM-DD"),
        booking_time: moment(date).format("hh:mm:ss"),
        vendorID: data?.users[0]?.id,

        cardID: selectedCard,
      };

      const formData = new FormData();
      for (const [key, value] of Object.entries(postdata)) {
        formData.append(key, value);
      }
      // console.log(formData);

      const onSuccess = ({ data }) => {
        console.log("datata on success ", data);
        dispatcher(BookingDetail());
        utils.successAlert(data?.message + " Booked");
        navigation.navigate(SCREENS.RateAndReview, { data });
      };

      const onFailure = (error) => {
        console.log("error", error);
      };
      let config = {
        headers: {
          Authorization: store.getState().Auth.accessToken,
        },
      };
      axios
        .post(
          CONSTANTS.API_CALLS.BASE_URL + CONSTANTS.API_CALLS.BOOKING,
          postdata,
          config
        )
        .then(onSuccess)
        .catch(onFailure);
    }
  };

  const rendorItem = ({ item, index }) => {
    return (
      <MyTouchableOpacity
        onPress={() => {
          Cref.current.snapToItem(index);
          setSelectedCard(item?.id);
        }}
        style={{
          paddingHorizontal: SIZES.fifteen,
          paddingVertical: SIZES.fifteen,
          borderWidth: 1,
          borderColor:
            item.id === selectedCard ? COLORS.primary1 : COLORS.brownGrey,
          borderRadius: SIZES.ten,
          backgroundColor: index % 2 == 1 ? COLORS.darkGrey : COLORS.fbBlue,
          marginTop: SIZES.twenty,
        }}
      >
        {item?.id === selectedCard && (
          <View
            style={{
              position: "absolute",
              right: 0,
              top: -SIZES.fifteen,
              backgroundColor: "red",
              borderRadius: 50,
              padding: SIZES.five,
            }}
          >
            <Icon
              name={"ios-checkmark-sharp"}
              type={FONTFAMILY.Ionicons}
              style={{
                color: COLORS.white,
                fontSize: SIZES.twenty,
              }}
            />
          </View>
        )}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={IMAGES.VisaCard}
            style={{ height: SIZES.twenty * 2, width: SIZES.twenty * 2 }}
            resizeMode="contain"
          />
          <Text
            style={[
              FONTS.boldFont16,
              { marginLeft: SIZES.twentyFive, color: COLORS.white },
            ]}
          >
            {item?.card_number}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: SIZES.ten,
          }}
        >
          <View>
            <Text style={[FONTS.mediumFont10, { color: COLORS.white }]}>
              Month/Year
            </Text>
            <Text
              style={[
                FONTS.mediumFont10,
                {
                  marginLeft: SIZES.twentyFive,
                  color: COLORS.white,
                  marginTop: SIZES.five,
                },
              ]}
            >
              {item?.expiry_date}
            </Text>
          </View>
          <View>
            <Text style={[FONTS.mediumFont10, { color: COLORS.white }]}>
              cvc2/cvv2
            </Text>
            <Text
              style={[
                FONTS.mediumFont10,
                {
                  marginLeft: SIZES.twentyFive,
                  color: COLORS.white,
                  marginTop: SIZES.five,
                },
              ]}
            >
              {item?.cvv}
            </Text>
          </View>
        </View>
        <Text
          style={[
            FONTS.boldFont16,
            { color: COLORS.white, marginTop: SIZES.ten },
          ]}
        >
          {item?.cardholder_name}
        </Text>
      </MyTouchableOpacity>
    );
  };
  return (
    <View style={STYLES.container}>
      <NormalHeader title={"Select Card "} />
      <View>
        <Carousel
          layout={"default"}
          ref={Cref}
          data={cards}
          sliderWidth={width}
          itemWidth={width / 1.3}
          inactiveSlideOpacity={0.35}
          inactiveSlideScale={0.9}
          renderItem={rendorItem}
          //   onSnapToItem = { index => this.setState({activeIndex:index}) }
        />
      </View>
      <View style={{ paddingHorizontal: SIZES.fifteen }}>
        <TouchableOpacity
          style={{
            marginTop: height * 0.1,
            alignItems: "center",
            justifyContent: "center",
            height: height * 0.2,
            borderWidth: 2,
            borderColor: COLORS.crimson,
            borderRadius: SIZES.ten,
            borderStyle: "dashed",
          }}
          onPress={() => {
            navigation.navigate(SCREENS.AddCard);
          }}
        >
          <Text style={[FONTS.mediumFont16, { color: COLORS.crimson }]}>
            Add Card{" "}
          </Text>
        </TouchableOpacity>
        <ButtonRadius10
          style={{ marginTop: height * 0.2 }}
          label={"Confirm payment"}
          onPress={async () => {
            await ConfirmBooking();
          }}
        />
      </View>
      <Loader visibility={isLoading} />
    </View>
  );
}

const styles = StyleSheet.create({});

const carouselItems = [
  {
    id: 1,
    title: "Item 1",
    text: "Text 1",
  },
  {
    id: 2,
    title: "Item 2",
    text: "Text 2",
  },
  {
    id: 3,
    title: "Item 3",
    text: "Text 3",
  },
  {
    id: 4,
    title: "Item 4",
    text: "Text 4",
  },
  {
    id: 5,
    title: "Item 5",
    text: "Text 5",
  },
];

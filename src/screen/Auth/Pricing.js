import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  FlatList,
} from 'react-native';
import ButtonRadius10 from '../../components/ButtonRadius10';
import EditText from '../../components/EditText';
import MyTouchableOpacity from '../../components/MyTouchableOpacity';
import Row from '../../components/Row';
import BackArrow from '../../components/BackArrow';
import {
  COLORS,
  CONSTANTS,
  FONTFAMILY,
  FONTS,
  height,
  IMAGES,
  SCREENS,
  SIZES,
  STYLES,
  width,
} from '../../constants';

export default function Pricing(props) {
  const [prices, setPrices] = useState(DATA);
  const [selectedPrice, setSelectedPrice] = useState('');

  const PricingItem = ({item, index}) => {
    return (
      <MyTouchableOpacity
        style={[
          styles.listItem,
          {
            backgroundColor: item.isSelected ? COLORS.primary1 : COLORS.white,
          },
        ]}
        onPress={() => {
          let temp = [];
          prices.map((e, i) => {
            if (i === index) {
              e.isSelected = true;
              setSelectedPrice(e.price);
            } else {
              e.isSelected = false;
            }
            temp.push(e);
          });
          setPrices(temp);
        }}>
        <Text
          style={[
            FONTS.mediumFont14,
            {color: item.isSelected ? COLORS.white : COLORS.brownGrey},
          ]}>
          Start From
        </Text>
        <Text
          style={[
            FONTS.boldFont24,
            {color: item.isSelected ? COLORS.white : COLORS.black},
          ]}>
          ${item.price}
        </Text>
      </MyTouchableOpacity>
    );
  };

  return (
    <View style={STYLES.container}>
      {/* <StatusBar
        hidden={false}
        barStyle={'dark-content'}
        backgroundColor={COLORS.white}
      /> */}
      <View style={{}}>
        <BackArrow style={{marginLeft: SIZES.fifteen}} />
        {/* ======================== HEADER HERE ======================== */}
        <View
          style={{
            justifyContent: 'center',
          }}>
          <Text
            style={[
              FONTS.mediumFont18,
              {color: COLORS.BLACK, textAlign: 'center'},
            ]}>
            Starting from
          </Text>
          <Image
            source={IMAGES.LogoPhotoMap}
            resizeMode="contain"
            style={{
              height: SIZES.twentyFive * 3,
              width: SIZES.twentyFive * 8.5,
              alignSelf: 'center',
            }}
          />

          <Text
            style={[
              FONTS.mediumFont14,
              {color: COLORS.brownGrey, textAlign: 'center'},
            ]}>
            Duis aute irure dolor in reprehenderit{'\n'}in voluptate
          </Text>
        </View>

        <View style={{marginTop: SIZES.twentyFive}}>
          <FlatList
            horizontal
            data={prices}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={PricingItem}
            contentContainerStyle={{paddingHorizontal: SIZES.fifteen}}
          />
        </View>

        {/* ======================== BUTTONS HERE ======================== */}
        <View
          style={{
            marginTop: SIZES.fifteen * 3,
            marginHorizontal: SIZES.fifteen,
          }}>
          <ButtonRadius10
            label={'Start From $' + selectedPrice}
            style={{marginTop: SIZES.fifteen}}
            onPress={() => props.navigation.navigate(SCREENS.UploadFiles)}
          />
        </View>
      </View>

      <Text
        style={[
          FONTS.mediumFont14,
          {
            position: 'absolute',
            color: COLORS.brownGrey,
            alignSelf: 'center',
            bottom: SIZES.twentyFive,
          },
        ]}>
        You can also change later, If you want
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    padding: SIZES.twentyFive,
    borderColor: COLORS.crimson,
    borderWidth: 1,
    alignItems: 'center',
    alignSelf: 'baseline',
    borderRadius: SIZES.twenty,
    margin: SIZES.five,
  },
});

const DATA = [
  {
    id: '1',
    price: 250,
    isSelected: false,
  },
  {
    id: '2',
    price: 300,
    isSelected: false,
  },
  {
    id: '3',
    price: 350,
    isSelected: false,
  },
  {
    id: '4',
    price: 400,
    isSelected: false,
  },
];

import React, {useState} from 'react';
import {CheckBox, Icon} from 'native-base';
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import ButtonHelp from '../../components/ButtonHelp';
import {
  STYLES,
  IMAGES,
  SIZES,
  COLORS,
  FONTS,
  FONTFAMILY,
  SCREENS,
  CONSTANTS,
} from '../../constants';
import ButtonRadius10 from '../../components/ButtonRadius10';
import {ScrollView} from 'react-native-gesture-handler';

export default function RequiredSteps({navigation}) {
  const [isChecked, setIsChecked] = useState(false);

  const RequiredStepsView = props => {
    let isChecked = props.isBright;
    return (
      <TouchableOpacity
        style={[
          props.style,
          {
            borderWidth: 1.5,
            borderColor: isChecked ? COLORS.turqoiseBlue : COLORS.black,
            marginTop: SIZES.fifteen,
            borderRadius: SIZES.ten,
            paddingVertical: SIZES.ten,
            paddingHorizontal: SIZES.fifteen,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          },
        ]}
        onPress={props.onPress}
        activeOpacity={0.6}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon
            type={FONTFAMILY.Ionicons}
            name="ios-image-outline"
            style={{color: isChecked ? COLORS.turqoiseBlue : COLORS.black}}
          />
          <View style={{marginHorizontal: SIZES.ten}}>
            <Text style={[FONTS.mediumFont16, {color: COLORS.BLACK}]}>
              {props.name}
            </Text>
            <Text
              style={[
                FONTS.lightFont12,
                {color: isChecked ? COLORS.turqoiseBlue : COLORS.brownGrey},
              ]}>
              {props.detail}
            </Text>
          </View>
        </View>
        <Icon
          type={FONTFAMILY.Entypo}
          name="chevron-right"
          style={{
            color: isChecked ? COLORS.turqoiseBlue : COLORS.black,
            fontSize: SIZES.twenty * 1.2,
          }}
        />
        {/* <CheckBox
          color={isChecked ? COLORS.turqoiseBlue : COLORS.brownGrey}
          checked={isChecked}
        /> */}
      </TouchableOpacity>
    );
  };

  const TermsAndConditionsView = () => {
    return (
      <TouchableOpacity
        style={[
          {
            borderWidth: 1.5,
            borderColor: isChecked ? COLORS.jadeGreen : COLORS.black,
            marginTop: SIZES.fifteen,
            borderRadius: SIZES.ten,
            paddingVertical: SIZES.ten,
            paddingHorizontal: SIZES.fifteen,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          },
        ]}
        onPress={() => setIsChecked(!isChecked)}
        activeOpacity={0.6}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <CheckBox
            // color={isChecked ? COLORS.jadeGreen : COLORS.brownGrey}
            color={COLORS.brownGrey}
            checked={isChecked}
            onPress={() => setIsChecked(!isChecked)}
            style={{
              marginLeft: -SIZES.ten,
              borderColor: isChecked ? COLORS.jadeGreen : COLORS.brownGrey,
              backgroundColor: isChecked ? COLORS.jadeGreen : COLORS.brownGrey,
            }}
          />
          <View style={{marginHorizontal: SIZES.twenty}}>
            <Text style={[FONTS.mediumFont16, {color: COLORS.BLACK}]}>
              Terms & Conditions
            </Text>
            <Text
              style={[
                FONTS.lightFont12,
                {color: isChecked ? COLORS.jadeGreen : COLORS.brownGrey},
              ]}>
              Approved
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[STYLES.container, {paddingHorizontal: SIZES.fifteen}]}>
      {/* <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} /> */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Image
          source={IMAGES.LoginLogo}
          resizeMode="contain"
          style={{
            height: SIZES.twentyFive * 2.5,
            width: SIZES.twentyFive * 5,
            alignSelf: 'center',
          }}
        />
        <ButtonHelp />
      </View>
      <Text
        style={[FONTS.boldFont22, {color: COLORS.black, marginTop: SIZES.ten}]}>
        Welcome, John Andrew
      </Text>
      <Text
        style={[
          FONTS.mediumFont14,
          {color: COLORS.black, marginTop: SIZES.ten},
        ]}>
        Required Steps
      </Text>
      <Text style={[FONTS.lightFont12, {color: COLORS.brownGrey}]}>
        Here's what you need to do set up your account.
      </Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 50}}>
        <RequiredStepsView
          name={'CNIC Back Side'}
          detail={'Recommended Next Step'}
          onPress={() => {
            navigation.navigate(SCREENS.UploadPhoto, {
              type: CONSTANTS.PHOTO_CNIC_BACK,
            });
          }}
        />
        <RequiredStepsView
          name={'CNIC Front Side'}
          detail={'Recommended Next Step'}
          onPress={() => {
            navigation.navigate(SCREENS.UploadPhoto, {
              type: CONSTANTS.PHOTO_CNIC_FRONT,
            });
          }}
        />
        <RequiredStepsView
          name={'Partner Photo'}
          detail={'Recommended Next Step'}
          onPress={() => {
            navigation.navigate(SCREENS.UploadPhoto, {
              type: CONSTANTS.PHOTO_PARTNER,
            });
          }}
        />
        <RequiredStepsView
          name={'Driving License Front Side'}
          detail={'Recommended Next Step'}
          onPress={() => {
            navigation.navigate(SCREENS.UploadPhoto, {
              type: CONSTANTS.PHOTO_DRIVING_LICENSE,
            });
          }}
        />
        <RequiredStepsView
          name={'Vehicle Registration Book'}
          detail={'Recommended Next Step'}
          onPress={() => {
            navigation.navigate(SCREENS.UploadPhoto, {
              type: CONSTANTS.PHOTO_VEHICLE_REG,
            });
          }}
        />
        <Text
          style={[
            FONTS.mediumFont14,
            {color: COLORS.black, marginTop: SIZES.ten},
          ]}>
          Completed
        </Text>
        <TermsAndConditionsView />
        <ButtonRadius10
          label={'Continue'}
          style={{marginTop: SIZES.twenty * 2}}
          onPress={() => navigation.replace(SCREENS.Home)}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});

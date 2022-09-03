import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import NormalHeader from '../../../components/NormalHeader';
import {
  COLORS,
  FONTFAMILY,
  FONTS,
  IMAGES,
  SCREENS,
  SIZES,
  STYLES,
} from '../../../constants';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Icon} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import CircularImage from '../../../components/CircularImage';

export default function Settings(props) {
  // Category componant
  const SettingsCategory = props => {
    return (
      <TouchableOpacity
        style={{
          borderWidth: 1.3,
          borderColor: COLORS.brownGrey,
          marginTop: SIZES.twentyFive,
          borderRadius: SIZES.ten,
          padding: SIZES.fifteen,
        }}
        activeOpacity={0.6}
        onPress={props.onPress}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon
            type="Ionicons"
            name={props.iconName}
            style={{color: COLORS.brownGrey, fontSize: SIZES.twentyFive}}
          />
          <Text
            style={[
              FONTS.lightFont14,
              {color: COLORS.brownGrey, marginStart: SIZES.ten},
            ]}>
            {props.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[STYLES.container, {backgroundColor: COLORS.secondary}]}>
      {/* <StatusBar
        backgroundColor={COLORS.secondary}
        barStyle={"light-content"}
      /> */}
      <NormalHeader title="Settings" isBright />
      <LinearGradient
        start={{x: 0.0, y: 0.25}}
        end={{x: 0.5, y: 1.0}}
        colors={[COLORS.secondary, COLORS.secondary]}
        style={{
          flex: 0.4,
          backgroundColor: COLORS.secondary,
          paddingHorizontal: SIZES.fifteen,
          justifyContent: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row'}}>
            <CircularImage
              image={IMAGES.user1}
              style={{
                height: SIZES.twenty * 3.5,
                width: SIZES.twenty * 3.5,
              }}
            />
            <View style={{marginLeft: SIZES.ten}}>
              <Text style={[FONTS.mediumFont16, {color: COLORS.white}]}>
                John Andrew
              </Text>
              <Text style={[FONTS.lightFont14, {color: COLORS.white}]}>
                Personal Info
              </Text>
            </View>
          </View>
          <Icon
            type={FONTFAMILY.AntDesign}
            name="right"
            style={{color: COLORS.white, fontSize: 18}}
          />
        </View>
      </LinearGradient>

      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
          borderTopLeftRadius: SIZES.ten,
          borderTopRightRadius: SIZES.ten,
          paddingHorizontal: SIZES.twenty,
        }}>
        <SettingsCategory
          name={'Notifications'}
          iconName="notifications-outline"
          onPress={() => {
            props.navigation.navigate(SCREENS.Notifications);
          }}
        />
        <SettingsCategory
          name={'Vehicle Management'}
          iconName="car-sport-outline"
          onPress={() => props.navigation.navigate(SCREENS.VehicleManagemet)}
        />
        <SettingsCategory
          name={'Document Management'}
          iconName="ios-document-text-outline"
          onPress={() => props.navigation.navigate(SCREENS.DocumentsManagment)}
        />
        <SettingsCategory
          name={'Reviews'}
          iconName="md-help-circle-outline"
          onPress={() => props.navigation.navigate(SCREENS.AllReviews)}
        />
        <SettingsCategory
          name={'About App'}
          iconName="md-timer-outline"
          onPress={() => props.navigation.navigate(SCREENS.AboutApp)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
});

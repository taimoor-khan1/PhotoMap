import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  TextInput,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import CountryPicker from 'react-native-country-picker-modal';
import {Icon} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import {
  COLORS,
  FONTFAMILY,
  FONTS,
  IMAGES,
  SCREENS,
  SIZES,
  STYLES,
} from '../../../constants';
import NormalHeader from '../../../components/NormalHeader';
import EditText from '../../../components/EditText';
import CircularImage from '../../../components/CircularImage';
import ButtonRadius10 from '../../../components/ButtonRadius10';
import Card from '../../../components/Card';
import UploadPhotoModal from '../../../components/modals/UploadPhotoModal';
import Row from '../../../components/Row';

export default function ChangePassword(props) {
  return (
    <View style={[STYLES.container, {}]}>
      {/* <StatusBar backgroundColor={COLORS.secondary} barStyle={"dark-content"} /> */}
      <NormalHeader title="Change Password" />
      <LinearGradient
        start={{x: 0.0, y: 0.25}}
        end={{x: 0.5, y: 1.0}}
        colors={[COLORS.secondary, COLORS.secondary]}
        style={{
          flex: 0.15,
          backgroundColor: COLORS.secondary,
          paddingHorizontal: SIZES.fifteen,
          justifyContent: 'center',
        }}>
        <Row
          style={{
            alignItems: 'center',
          }}>
          <View>
            <CircularImage
              image={IMAGES.user1}
              style={{
                height: SIZES.twenty * 3.5,
                width: SIZES.twenty * 3.5,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
          </View>
          <View style={{}}>
            <Text style={[FONTS.mediumFont14, {color: COLORS.black}]}>
              John Deen
            </Text>
            <Text style={[FONTS.lightFont10, {color: COLORS.primary1}]}>
              New York, USA
            </Text>
          </View>
        </Row>
      </LinearGradient>

      <ScrollView
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
          borderTopLeftRadius: SIZES.ten,
          borderTopRightRadius: SIZES.ten,
          paddingHorizontal: SIZES.twenty,
        }}
        showsVerticalScrollIndicator={false}>
        <View style={{marginTop: SIZES.fifteen * 1.5}}>
          <Text
            style={[
              FONTS.mediumFont14,
              {color: COLORS.primary1, marginBottom: SIZES.fifteen},
            ]}>
            Current Password
          </Text>

          <EditText
            placeholder="Enter Here"
            password
            hasIcon
            name="lock-open"
            type={FONTFAMILY.SimpleLineIcons}
          />
        </View>
        <View style={{marginTop: SIZES.fifteen * 1.5}}>
          <Text
            style={[
              FONTS.mediumFont14,
              {color: COLORS.primary1, marginBottom: SIZES.fifteen},
            ]}>
            New Password
          </Text>

          <EditText
            placeholder="Enter Here"
            password
            hasIcon
            name="lock-open"
            type={FONTFAMILY.SimpleLineIcons}
          />
        </View>

        <ButtonRadius10
          label={'Change & Continue'}
          style={{marginVertical: SIZES.twenty * 3}}
          onPress={() => {
            props.navigation.goBack();
          }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
});

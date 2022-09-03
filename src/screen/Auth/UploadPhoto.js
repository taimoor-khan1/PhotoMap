import React, {useEffect, useState} from 'react';
import {Icon} from 'native-base';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import ButtonRadius10 from '../../components/ButtonRadius10';
import UploadPhotoHeader from '../../components/UploadPhotoHeader';
import {
  SIZES,
  FONTS,
  FONTFAMILY,
  IMAGES,
  COLORS,
  STYLES,
  CONSTANTS,
} from './../../constants/theme';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import Card from '../../components/Card';
import UploadPhotoModal from '../../components/modals/UploadPhotoModal';

export default function UploadPhoto(props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [visibility, setVisibility] = useState(false);

  useEffect(() => {
    const type = props.route.params.type;
    // console.log('=======>>>>>', type);
    switch (type) {
      case CONSTANTS.PHOTO_CNIC_BACK:
        {
          setTitle('Take a photo of your CNIC Back Side');
          setDescription(
            'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui deserunt mollit anim id est laborum.',
          );
        }
        break;
      case CONSTANTS.PHOTO_CNIC_FRONT:
        {
          setTitle('Take a photo of your CNIC Front Side');
          setDescription(
            'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui deserunt mollit anim id est laborum.',
          );
        }
        break;
      case CONSTANTS.PHOTO_PARTNER:
        {
          setTitle('Take your profile photo');
          setDescription(
            'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. \n1. Excepteur sintoccaecat cupidatat non proident, sunt in culpa qui  deserunt mollit anim. \n2.  id est laborum in culpa qui  deserunt mollit anim.',
          );
        }
        break;
      case CONSTANTS.PHOTO_DRIVING_LICENSE:
        {
          setTitle('Take a photo of your Driving License Front Side');
          setDescription(
            'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui deserunt mollit anim id est laborum. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui  deserunt mollit laborum.',
          );
        }
        break;
      case CONSTANTS.PHOTO_VEHICLE_REG:
        {
          setTitle('Take a photo of your Vehicle Registration Book');
          setDescription(
            'Duis aute irure dolor in reprehenderit in voluptate.',
          );
        }
        break;

      default:
        {
          setTitle('');
          setDescription('');
        }
        break;
    }

    // console.log(
    //   'BBBBBBBAAAAABBBBBBBAAAAARRRRRR ======= >>>> ',
    //   title + ' ' + description,
    // );
  }, []);

  //********** Modal ************** */

  return (
    <View style={STYLES.container}>
      {/* <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} /> */}
      <UploadPhotoHeader />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: SIZES.fifteen,
          // justifyContent: 'space-between',
          paddingBottom: SIZES.twenty,
          marginTop: SIZES.five,
        }}
        showsVerticalScrollIndicator={false}>
        <View>
          <Text style={[FONTS.mediumFont16, {color: COLORS.BLACK}]}>
            {title}
          </Text>
          <Text style={[FONTS.mediumFont12, {color: COLORS.brownGrey}]}>
            {description}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: SIZES.twenty,
          }}>
          <Icon
            type={FONTFAMILY.Ionicons}
            name={'ios-information-circle-outline'}
            style={{color: COLORS.turqoiseBlue, fontSize: 22}}
          />
          <Text
            style={[
              FONTS.mediumFont14,
              {color: COLORS.turqoiseBlue, marginStart: SIZES.five},
            ]}>
            What is this?
          </Text>
        </View>
        <Image
          source={image !== '' ? {uri: image} : IMAGES.takePhoto}
          style={{
            height: SIZES.twenty * 10,
            width: SIZES.twenty * 15,
            alignSelf: 'center',
            marginTop: SIZES.twenty,
            borderRadius: SIZES.ten,
          }}
          resizeMode={'contain'}
        />
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            justifyContent: 'center',
            marginTop: SIZES.fifteen,
          }}
          activeOpacity={0.6}
          onPress={() => {
            setVisibility(true);
          }}>
          <Icon
            type={FONTFAMILY.Ionicons}
            name={'camera-outline'}
            style={{color: COLORS.turqoiseBlue, fontSize: 20}}
          />
          <Text
            style={[
              FONTS.lightFont14,
              {
                color: COLORS.turqoiseBlue,
                marginStart: SIZES.five,
              },
            ]}>
            Take Photo{' '}
          </Text>
        </TouchableOpacity>
        <ButtonRadius10
          label={'Proceed'}
          style={{marginTop: SIZES.twentyFive * 5}}
        />
      </ScrollView>
      <UploadPhotoModal
        visibility={visibility}
        setVisibility={setVisibility}
        onImageSelected={image => {
          setImage(image);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bottomSheetBody: {
    backgroundColor: COLORS.white,
    padding: SIZES.fifteen,
    borderTopStartRadius: SIZES.ten,
    borderTopEndRadius: SIZES.ten,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  viewSelectImageType: {
    flex: 1,
    paddingVertical: SIZES.fifty * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.ten,
  },
  loginBtnBg: {
    alignItems: 'center',
    borderRadius: SIZES.ten,
    width: '45%',
    height: 60,
  },
});

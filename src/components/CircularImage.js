import React, {useState} from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import {COLORS, CONSTANTS, FONTFAMILY, SIZES, IMAGES} from '../constants';

export default function CircularImage(props) {
  // console.log('CircularImage =============== >>>>>>>> ', props);
  return (
    <View style={[props.style, {overflow: 'hidden'}]}>
      <Image
        resizeMode="cover"
        source={!props.uri ? props.image : {uri: props.uri}}
        style={[styles.image, props.imageStyle]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: SIZES.twenty * 2.5,
    width: SIZES.twenty * 2.5,
    borderRadius: SIZES.twenty * 2.5,
    borderWidth: 1,
    borderColor: COLORS.white,
  },
});

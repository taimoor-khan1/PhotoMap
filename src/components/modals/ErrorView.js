// import React from 'react';
// import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import {Icon} from 'native-base';
// import Modal from 'react-native-modal';
// import MyTouchableOpacity from '../MyTouchableOpacity';
// import MessageEditText from '../MessageEditText';
// import StarRating from 'react-native-star-rating';
// import CircularImage from '../CircularImage';
// import {
//   COLORS,
//   FONTFAMILY,
//   FONTS,
//   IMAGES,
//   SIZES,
//   STYLES,
// } from '../../constants';
// import ButtonRadius5 from '../ButtonRadius5';

// export default function ErrorView(props) {
//   const [dismiss, setDismiss] = React.useState(false);

//   return (
//     <View style={STYLES.container}>
//       <Modal
//         isVisible={!dismiss}
//         animationIn="zoomInDown"
//         animationOut="zoomOutUp"
//         animationInTiming={600}
//         animationOutTiming={600}
//         backdropTransitionInTiming={600}
//         backdropTransitionOutTiming={600}>
//         <View
//           style={{
//             backgroundColor: COLORS.white,
//             padding: SIZES.ten,
//             borderRadius: SIZES.ten,
//             borderWidth: 0.5,
//             borderColor: COLORS.red,
//           }}>
//           <Text
//             style={[
//               FONTS.boldFont24,
//               {
//                 color: COLORS.black,
//                 marginTop: SIZES.five,
//                 textAlign: 'center',
//                 marginBottom: SIZES.twenty,
//               },
//             ]}>
//             Error!!
//           </Text>
//           <Text
//             style={[
//               FONTS.mediumFont14,
//               {textAlign: 'center', marginBottom: SIZES.ten},
//             ]}>
//             {props.route.params.msg}
//           </Text>
//           <ButtonRadius5
//             label={'OK'}
//             style={{marginTop: SIZES.twenty}}
//             onPress={() => {
//               setDismiss(true);
//               setTimeout(() => {
//                 props.navigation.goBack();
//               }, 500);
//             }}
//           />
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({});

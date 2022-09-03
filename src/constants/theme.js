import {Dimensions, Platform, StyleSheet} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

export const {width, height} = Dimensions.get('window');

/* *************** Colors ********** */

export const COLORS = {
  // base colors
  primary1: '#ec1941',

  secondary: '#fdfcff',

  // normal colors
  black: '#000000',
  brownGrey: '#959595',
  facebook: '#0037c1',
  apple: '#262a34',
  google: '#eb4335',

  // gradients
  gradient: ['#20242b', '#3a3d46'],

  // colors
  crimson: '#860012',
  blackWithOpacity: '#00000080',
  blackLight: '#333232',
  white: '#FFFFFF',
  whiteOpacity: '#FFFFFF80',
  LightwhiteOpacity: '#FFFFFF10',
  veryLightPink: '#f2f2f2',
  red: '#E8292A',
  redOpacity: '#E8292A60',
  pumpkinOrange: '#ff8000',
  claret: '#640118',
  purplishRed: '#ae0b4c',
  grey: '#dae0e8',
  green: '#1fd826',
  spearMint: '#1bfc6e',
  mintyGreen: '#0cff75',
  mintyGreenOpacity: '#0cff7580',
  // brownGrey: "#535353",
  paleGrey: '#f6f5f8',
  brownGrey2: '#464646',
  bluishGrey: '#1e2228',
  darkGrey: '#333232',
  darkopacity: '#2a2f39',
  lightGrey: '#3d4148',
  lightBlack: '#353E4D',
  transparent: 'transparent',
  fbBlue: '#224b9c',
  STATUSBAR_COLOR: '#560027',
  HEADER_COLOR: '#880e4f',
  CARD_BG_COLOR: '#ffffff',
  HEADER_TEXT_COLOR: '#ffffff',
  HEADER_BACK_ICON_COLOR: '#ffffff',
  BLACK: '#000000',
  azure: '#27aae1',
  bluish: '#1d89b7',
  skyBlue: '#6498ff',
  richBlue: '#0019ff',
  brightSkyBlue: '#00b1ff',
  darkwithOpacity: '#1f2228FF',
  dark: '#1f2228',
  verMillion: '#ff2d00',
  darkSlateBlue: '#252563',
  turqoiseBlue: '#01b5d6',
  aquaMarine: '#49d4d5',
  jadeGreen: '#2cb258',
  golden: '#ffcc00',
};

const appTheme = {COLORS};

export default appTheme;

/* * Fonts * */
export const FONTFAMILY = {
  Light: 'Poppins-Light',
  Medium: 'Poppins-Medium',
  Bold: 'Poppins-Bold',
  Ionicons: 'Ionicons',
  AntDesign: 'AntDesign',
  EvilIcons: 'EvilIcons',
  Entypo: 'Entypo',
  FontAwesome: 'FontAwesome',
  Feather: 'Feather',
  MaterialIcons: 'MaterialIcons',
  MaterialCommunityIcons: 'MaterialCommunityIcons',
  Octicons: 'Octicons',
  SimpleLineIcons: 'SimpleLineIcons',
  Fontisto: 'Fontisto',
};

/* * Images * */
export const IMAGES = {
  BGSplash: require('../assets/BGSplash.png'),
  BGUserImage: require('../assets/BGUserImage.png'),
  fbBtn: require('../assets/fbBtn.png'),
  GoogleBtn: require('../assets/GoogleBtn.png'),
  appleBtn: require('../assets/appleBtn.png'),
  user1: require('../assets/user1.png'),
  identyfyCard: require('../assets/IdentifyCard.png'),
  identifyDriving: require('../assets/identyfyDriving.png'),
  IconStarRed: require('../assets/IconStarRed.png'),
  IconStarFilled: require('../assets/IconStarFilled.png'),
  IconStarUnfilled: require('../assets/IconStarUnfilled.png'),
  takePhoto: require('../assets/takePhoto.png'),
  LogoPhotoMap: require('../assets/LogoPhotoMap.png'),
  IconPhotography: require('../assets/IconPhotography.png'),
  IconUser: require('../assets/IconUser.png'),
  IconParty: require('../assets/IconParty.png'),
  IconEvents: require('../assets/IconEvents.png'),
  IconModel: require('../assets/IconModel.png'),
  IconWedding: require('../assets/IconWedding.png'),
  ImageParty: require('../assets/ImageParty.png'),
  addressIcon: require('../assets/addressIcon.png'),
  MarkerImage: require('../assets/MarkerImage.png'),
  VisaCard: require('../assets/VisaCard.png'),
  Loader: require('../assets/42516-camera-rec.json'),
};

/* * Screens * */
export const SCREENS = {
  Auth: 'Auth',
  Splash: 'Splash',
  CreateAccount: 'CreateAccount',
  SignUp: 'SignUp',
  VendorSignUp: 'VendorSignUp',
  Pricing: 'Pricing',
  OTP: 'OTP',
  Login: 'Login',
  Profile: 'Profile',
  ChangePassword: 'ChangePassword',
  ResetPassword: 'ResetPassword',
  ForgetPassword: 'ForgetPassword',
  Settings: 'Settings',
  Notifications: 'Notifications',
  VehicleManagemet: 'VehicleManagemet',
  DocumentsManagment: 'DocumentsManagment',
  AddNewVehicle: 'AddNewVehicle',
  AllReviews: 'AllReviews',
  RequiredSteps: 'RequiredSteps',
  DrawerNavigator: 'DrawerNavigator',
  Home: 'Home',
  Nearby: 'Nearby',
  NearByMapView: 'NearByMapView',
  Wallet: 'Wallet',
  UploadPhoto: 'UploadPhoto',
  UploadFiles: 'UploadFiles',
  UserDetails: 'UserDetails',
  EditProfile: 'EditProfile',
  TermsAndConditions: 'TermsAndConditions',
  AboutApp: 'AboutApp',
  RateAndReview: 'RateAndReview',
  BookingDetails: 'BookingDetails',
  SinglePhotoshoot: 'SinglePhotoshoot',
  PhotographerProfile: 'PhotographerProfile',
  PortFolio: 'PortFolio',
  BottomBar: 'BottomBar',
  More: 'More',
  UserMainLayout: 'MainLayout',
  VendorMainLayout: 'VendorMainLayout',
  HelpAndSupport: 'HelpAndSupport',
  Search: 'Search',
  PostJob: 'PostJob',
  UserEditProfile: 'UserEditProfile',
  VendorProfile: 'VendorProfile',
  VendorEditProfile: 'VendorEditProfile',
  VendorPortFolio: 'VendorPortFolio',
  JobDetails: 'JobDetails',
  FilterLocation: 'FilterLocation',
  SelectCard: 'SelectCard',
  AddCard: 'AddCard',
  AppliedJob: 'AppliedJob',
  LoginAccount: 'LoginAccount',
};

export const SIZES = {
  // global sizes
  five: height * 0.0055,
  ten: height * 0.011,
  fifteen: height * 0.017,
  twenty: height * 0.023,
  twentyWidth: width * 0.05,
  twentyFive: height * 0.03,
  twentyFiveWidth: width * 0.08,
  fifty: height * 0.075,
  fiftyWidth: width * 0.13,

  // font sizes
  h16: width * 0.034,
  h18: width * 0.038,
  h20: width * 0.042,
  h22: width * 0.048,
  h24: width * 0.055,
  body08: width * 0.024,
  body10: width * 0.028,
  body12: width * 0.032,
  body14: width * 0.036,
  body16: width * 0.04,
  body18: width * 0.045,
};

export const FONTS = {
  boldFont16: {
    fontFamily: FONTFAMILY.Bold,
    fontSize: SIZES.h16,
    color: COLORS.BLACK,
  },
  boldFont18: {
    fontFamily: FONTFAMILY.Bold,
    fontSize: SIZES.h18,
    color: COLORS.BLACK,
  },
  boldFont20: {
    fontFamily: FONTFAMILY.Bold,
    fontSize: SIZES.h20,
    color: COLORS.BLACK,
  },
  boldFont22: {
    fontFamily: FONTFAMILY.Bold,
    fontSize: SIZES.h22,
    color: COLORS.BLACK,
  },
  boldFont24: {
    fontFamily: FONTFAMILY.Bold,
    fontSize: SIZES.h24,
    color: COLORS.BLACK,
  },
  mediumFont10: {fontFamily: FONTFAMILY.Medium, fontSize: SIZES.body10},
  mediumFont12: {fontFamily: FONTFAMILY.Medium, fontSize: SIZES.body12},
  mediumFont14: {fontFamily: FONTFAMILY.Medium, fontSize: SIZES.body14},
  mediumFont16: {fontFamily: FONTFAMILY.Medium, fontSize: SIZES.body16},
  mediumFont18: {fontFamily: FONTFAMILY.Medium, fontSize: SIZES.body18},
  lightFont08: {fontFamily: FONTFAMILY.Light, fontSize: SIZES.body08},
  lightFont10: {fontFamily: FONTFAMILY.Light, fontSize: SIZES.body10},
  lightFont12: {fontFamily: FONTFAMILY.Light, fontSize: SIZES.body12},
  lightFont14: {fontFamily: FONTFAMILY.Light, fontSize: SIZES.body14},
  lightFont16: {fontFamily: FONTFAMILY.Light, fontSize: SIZES.body16},
  lightFont18: {fontFamily: FONTFAMILY.Light, fontSize: SIZES.body18},
};

export const STYLES = StyleSheet.create({
  container: {
    backgroundColor: COLORS.secondary,
    flex: 1,
    paddingTop:
      Platform.OS === 'android'
        ? SIZES.twentyFive * 1.8
        : getStatusBarHeight(true),
  },
  splashLogo: {
    width: SIZES.fifteen * 13,
    height: SIZES.fifteen * 13,
    alignSelf: 'center',
  },
  loginView: {
    flex: 1,
    width: '100%',
    marginTop: SIZES.twenty,
    paddingHorizontal: SIZES.twenty,
  },
  lightText: {
    fontFamily: FONTFAMILY.Light,
  },
  mediumText: {
    fontFamily: FONTFAMILY.Medium,
  },
  boldText: {
    fontFamily: FONTFAMILY.Bold,
  },
  headingText: {
    fontFamily: FONTFAMILY.Bold,
    fontSize: SIZES.twenty + 5,
    color: COLORS.black,
  },
  paragraphText: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: SIZES.fifteen - 1,
    color: COLORS.black,
  },
  drawerItem: {
    paddingHorizontal: SIZES.fifteen + 3,
    paddingVertical: SIZES.fifteen,
    alignItems: 'center',
    borderRadius: SIZES.fifteen,
  },
  drawerIcon: {
    fontSize: SIZES.fifteen + 10,
  },
  drawerText: {
    fontSize: SIZES.fifteen,
    fontFamily: FONTFAMILY.Medium,
    color: COLORS.black,
    marginHorizontal: SIZES.fifteen - 5,
  },
  horLine: {
    height: 0.3,
    marginVertical: SIZES.fifteen,
    backgroundColor: COLORS.brownGrey,
  },
  shadow: {
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.0,
    elevation: 5,
  },
  CardStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 50,
    borderRadius: SIZES.ten,
    marginHorizontal: SIZES.five / 2,
    paddingHorizontal: SIZES.five / 2,
    marginVertical: SIZES.five * 1.3,
    color: COLORS.black,
    justifyContent: 'space-between',
  },
  CardImage: {
    height: width * 0.1,
    width: width * 0.1,
  },
});

/* * Api Path * */
export const CONSTANTS = {
  USER: 'USER',

  /* * FirebaseConstants * */
  FIREBASE: {
    CHAT: 'Chat',
    MESSAGES: 'messages',
    USERS: 'Users',
    CHATHEADS: 'ChatHeads',
    READ: 'read',
    TOKEN: 'Tokens',
    FCM: 'https://fcm.googleapis.com/fcm/send',
  },

  PHOTO_GRAPHER: 'PHOTO_GRAPHER',
  USERTYPE: 'USERTYPE',

  API_CALLS: {
    BASE_URL: 'https://dev-photomap.reignsol.net/',
    IMAGE_URL: 'https://dev-photomap.reignsol.net/',
    GET_CARDS: 'api/v1/user/cards/getCards',
    BEST_JOBS: 'api/v1/vendor/jobs/jobList',
    BOOKING_Details: 'api/v1/user/getProfilebooking',
    GET_VENDOR_PROFILE: 'api/v1/vendor/vendorprofile',
    FACEBOOK_LOGIN: 'api/v1/user/social/facebook',
    GOOGLE_LOGIN: 'api/v1/user/social/google',
    APPLE_LOGIN: 'api/v1/user/social/apple',

    LOGIN: 'api/v1/user/login',
    VENDOR_LOGIN: 'api/v1/vendor/login',

    LOGOUT: 'auth/sign-out',
    BOOKING: 'api/v1/user/orders/createOrder',
    PHOTO_GRAPHERS: 'api/v1/user/home/vendorSeeAll',
    SINGLE_PHOTO_GRAPHER: 'api/v1/user/home/vendorView',
    POST_JOB: 'api/v1/user/jobs/jobCreate',
    RECENT_JOBS: 'api/v1/vendor/jobs/recentJobList',
    APPLIED_JOB_LIST: 'api/v1/vendor/jobs/applyJobList',
    CATEGORY: 'api/v1/user/home/categoryAll',
    SIGN_UP_VENDER: 'api/v1/vendor/register',
    SIGN_UP_USER: 'api/v1/user/register',
    VERIFY_OTP: 'api/v1/user/verify-otp',
    APPLY_JOB: 'api/v1/vendor/jobs/jobApply',
    ADD_RATING: 'api/v1/user/reviews/createReview',
    GET_RATING_REVIEWS: 'api/v1/user/reviews',
    GET_CATEGORY_BY_VENDER: 'api/v1/user/home/categoryByVendor',
    FORGOT_PASSWORD: 'api/v1/user/forgot-password',
    RESET_PASSWORD: 'api/v1/user/reset-password',
    // CHANGE_PASSWORD: "auth/change-password",
    GET_PROFILE: 'api/v1/user/getProfile',
    GET_NOTIFICATION: 'api/v1/user/notifications/getNotifications',

    UPDATE_PROFILE: 'api/v1/user/update-profile',
    VENDOR_UPDATE_PROFILE: 'api/v1/vendor/update-profile',
    GET_CONTENT: 'api/v1/user/contents',
  },
};

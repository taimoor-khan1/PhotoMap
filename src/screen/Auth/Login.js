import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import ButtonRadius10 from '../../components/ButtonRadius10';
import EditText from '../../components/EditText';
import MyTouchableOpacity from '../../components/MyTouchableOpacity';
import Row from '../../components/Row';
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

import {useDispatch, useSelector} from 'react-redux';
// import { GoogleSignin } from "@react-native-google-signin/google-signin";
import appleAuth, {
  AppleButton,
} from '@invertase/react-native-apple-authentication';
import auth, {firebase} from '@react-native-firebase/auth';
import {AccessToken, LoginManager} from 'react-native-fbsdk';

import {
  login,
  Vendorlogin,
  Facebooklogin,
  Googlelogin,
  Applelogin,
} from '../../redux/Silices/Auth';
import {show, hide} from '../../redux/Silices/Loader';
import utils from '../../utils';

export default function Login(props) {
  const {route, navigation} = props;
  const {USERTYPE} = route?.params;
  var user;
  const [email, setEmail] = useState('user@yopmail1.com');

  const [password, setpassword] = useState('12345678');
  const dispatcher = useDispatch();
  const token = useSelector(state => state.Auth.accessToken);
  const userData = useSelector(state => state);

  React.useEffect(() => {
    // GoogleSignin.configure({
    //   webClientId:
    //     "712034051940-od57ggdh9frqpfkfpuaueeql4asq9nsn.apps.googleusercontent.com",
    // });
    // initFirebase();
  }, []);

  // =====================Login User=====================
  const loginUser = async () => {
    if (email == '' || password == '') {
      utils.errorAlert('Email or Password is empty');
    } else if (USERTYPE === CONSTANTS.PHOTO_GRAPHER) {
      dispatcher(show());
      dispatcher(Vendorlogin({email, password}))
        .unwrap()
        .then(_response => {
          if (_response.status == 2) {
            navigation.navigate(SCREENS.OTP, {
              ScreenName: SCREENS.Login,
              email: _response?.data?.email,
            });
          }
          dispatcher(hide());
        })
        .catch(err => {
          dispatcher(hide());
        });
    } else {
      dispatcher(show());
      dispatcher(login({email, password}))
        .unwrap()
        .then(_response => {
          if (_response.status == 2) {
            navigation.navigate(SCREENS.OTP, {
              ScreenName: SCREENS.Login,
              email: _response?.data?.email,
            });
          }
          dispatcher(hide());
        })
        .catch(err => {
          dispatcher(hide());
        });
    }
  };

  const initFirebase = () => {
    var firebaseConfig = {
      apiKey: 'AIzaSyBoSvd1-NyERW6WqJR_DDw1ApeevccMn9A',
      authDomain: 'photomap-29990.firebaseapp.com',
      projectId: 'photomap-29990',
      storageBucket: 'photomap-29990.appspot.com',
      messagingSenderId: '712034051940',
      appId: '1:712034051940:web:5c0595b17d0986b2037c71',
      measurementId: 'G-32QQBH06B5',
      databaseURL: '',
    };
    !firebase.apps.length
      ? firebase.initializeApp(firebaseConfig)
      : firebase.app();
  };

  const onAppleButtonPress = async () => {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      // throw 'Apple Sign-In failed - no identify token returned';
      console.log('not login');
    }

    // Create a Firebase credential from the response
    const {identityToken, nonce} = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(
      identityToken,
      nonce,
    );

    // console.log('====== >>>>>>>> ', appleCredential);

    // Sign-in the user with the credential
    auth()
      .signInWithCredential(appleCredential)
      .then(async res => {
        console.log('apple Login Responce ========= >', res);

        // dispatcher(show());

        // var name = res.user.displayName;
        // var email = res.user.email;

        // dispatcher(Applelogin({ name, email, idToken }))
        //   .unwrap()
        //   .then((response) => {
        //     dispatcher(hide);
        //   });

        // setIsloading(true);
        // await dispatcher(
        //   AuthActions.AppleLoginUser(res, responcee => {
        //     setIsloading(false);
        //     // console.log('Api Call back Responce ', responcee);
        //     // setIsloading(true);
        //     if (responcee.success === 0) {
        //       setIsloading(false);
        //       seterrorMsg(JSON.stringify(responcee.data));
        //       setshowErrorView(true);
        //     }
        //   }),
        // );
      })
      .catch(e => {
        console.log(' error apple login======= >>>>>>>> ', e);
        // setShowLoader(false);
      });
  };

  // ==========================google login====================
  async function onGoogleButtonPress() {
    const {idToken} = await GoogleSignin.signIn();

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth()
      .signInWithCredential(googleCredential)
      .then(res => {
        dispatcher(show());

        var name = res.user.displayName;
        var email = res.user.email;

        dispatcher(Googlelogin({name, email, idToken}))
          .unwrap()
          .then(response => {
            dispatcher(hide);
          });

        // GoodleauthenticateHandler(res.user);
      })
      .catch(e => {
        // console.log("onGoogleButtonPress e =============>>>>>>>>>", e);
      });
  }

  // ==========================facebook login====================
  async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    initUser(data.accessToken);
  }

  // ==============get facebook user Data===========
  function initUser(token) {
    fetch(
      'https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' +
        token,
    )
      .then(response => response.json())
      .then(json => {
        dispatcher(show());
        dispatcher(Facebooklogin(json.name, json.email, token))
          .unwrap()
          .then(_response => {
            dispatcher(hide());
          });
      })
      .catch(err => {
        console.log('error on login', err);
      });
  }

  return (
    <ScrollView
      style={[STYLES.container, {backgroundColor: COLORS.white}]}
      contentContainerStyle={{paddingBottom: SIZES.twenty * 2}}
      bounces={false}
      showsVerticalScrollIndicator={false}>
      <View
        style={{
          height: height,
          width: width,
          paddingHorizontal: SIZES.fifteen,
        }}>
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
            Log in to
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
            Enter your details below
          </Text>
        </View>

        {/* ======================== TEXTINPUTS HERE ======================== */}
        <View style={{}}>
          <View style={{marginTop: SIZES.twentyFive * 1.5}}>
            <Text
              style={[
                FONTS.mediumFont14,
                {color: COLORS.primary1, marginBottom: SIZES.fifteen},
              ]}>
              Username or Email
            </Text>

            <EditText
              value={email}
              onChangeText={text => setEmail(text)}
              placeholder="Enter Email"
              hasIcon
              name="mail"
              type={FONTFAMILY.AntDesign}
            />
          </View>
          <View style={{marginTop: SIZES.fifteen * 1.5}}>
            <Row
              style={{alignItems: 'center', justifyContent: 'space-between'}}>
              <Text
                style={[
                  FONTS.mediumFont14,
                  {color: COLORS.primary1, marginBottom: SIZES.fifteen},
                ]}>
                Password
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  props.navigation.navigate(SCREENS.ForgetPassword)
                }>
                <Text
                  style={[
                    FONTS.mediumFont14,
                    {color: COLORS.BLACK, marginBottom: SIZES.fifteen},
                  ]}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </Row>

            <EditText
              value={password}
              onChangeText={text => setpassword(text)}
              placeholder="Enter password"
              password
              hasIcon
              name="lock-open"
              type={FONTFAMILY.SimpleLineIcons}
            />
          </View>
        </View>

        {/* ======================== BUTTONS HERE ======================== */}
        <View style={{marginTop: SIZES.fifteen * 3}}>
          <ButtonRadius10
            label={'Sign In'}
            style={{marginTop: SIZES.fifteen}}
            onPress={() => {
              loginUser();
            }}
          />
          {/* 
          {USERTYPE === CONSTANTS.PHOTO_GRAPHER ? null : (
            <View style={{ marginTop: SIZES.fifteen * 3 }}>
              <Row
                style={{
                  marginVertical: SIZES.twenty,
                  alignItems: "center",
                }}
              >
                <View style={STYLES.horLine} />
                <Text
                  style={[
                    FONTS.lightFont12,
                    { color: COLORS.brownGrey, flex: 1, textAlign: "center" },
                  ]}
                >
                  Or continue
                </Text>
                <View style={STYLES.horLine} />
              </Row>

              <Row
                style={{
                  alignItems: "center",
                  justifyContent:
                    Platform.OS === "ios" ? "space-between" : "space-around",
                }}
              >
                {Platform.OS === "ios" && (
                  <MyTouchableOpacity
                    style={{
                      paddingHorizontal: SIZES.twentyFive * 1.2,
                      paddingVertical: SIZES.twenty,
                      backgroundColor: COLORS.apple,
                      borderRadius: SIZES.twentyFive * 1.5,
                    }}
                  >
                    <Row
                      style={{ alignItems: "center", justifyContent: "center" }}
                    >
                      <Image
                        source={IMAGES.appleBtn}
                        resizeMode="contain"
                        style={{
                          height: SIZES.fifteen * 2,
                          width: SIZES.fifteen * 2,
                        }}
                      />
                      <Text
                        style={[
                          FONTS.mediumFont12,
                          { color: COLORS.white, marginStart: SIZES.five },
                        ]}
                      >
                        Continue with
                      </Text>
                    </Row>
                  </MyTouchableOpacity>
                )}
                <MyTouchableOpacity
                  onPress={() => {
                    onFacebookButtonPress();
                  }}
                >
                  <Image
                    source={IMAGES.fbBtn}
                    resizeMode="contain"
                    style={{
                      height: SIZES.twentyFive * 2.6,
                      width: SIZES.twentyFive * 2.6,
                    }}
                  />
                </MyTouchableOpacity>
                <MyTouchableOpacity
                  onPress={() => {
                    onGoogleButtonPress();
                  }}
                >
                  <Image
                    source={IMAGES.GoogleBtn}
                    resizeMode="contain"
                    style={{
                      height: SIZES.twentyFive * 2.6,
                      width: SIZES.twentyFive * 2.6,
                    }}
                  />
                </MyTouchableOpacity>
              </Row>
            </View>
          )} */}

          <Row
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: SIZES.twentyFive,
            }}>
            <Text
              style={[
                FONTS.mediumFont12,
                {color: COLORS.brownGrey, textAlign: 'center'},
              ]}>
              Not a member?{'  '}
            </Text>
            <Text
              style={[FONTS.mediumFont12, {color: COLORS.primary1}]}
              onPress={() => props.navigation.navigate(SCREENS.CreateAccount)}>
              Create Account
            </Text>
          </Row>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});

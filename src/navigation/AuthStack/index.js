import React from "react";
import { StatusBar, StyleSheet, Modal, View } from "react-native";

import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { COLORS, IMAGES, SCREENS } from "../constants";

import Splash from "../screen/Auth/Splash";
import Login from "../screen/Auth/Login";
import SignUp from "../screen/Auth/SignUp";
import VendorSignUp from "../screen/Auth/VendorSignUp";

import Verification from "./../screen/Auth/Verification";

import ForgotPassword from "./../screen/Auth/ForgotPassword";

import ResetPassword from "./../screen/Auth/ResetPassword";

import CreateAccount from "../screen/Auth/CreateAccount";

import ChangePassword from "../screen/User/profile/ChangePassword";

export default function MainNavigation() {
  const Stack = createSharedElementStackNavigator();

  return (
    <>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={SCREENS.Splash}
      >
        <Stack.Screen name={SCREENS.Splash} component={Splash} />
        <Stack.Screen name={SCREENS.Login} component={Login} />
        <Stack.Screen name={SCREENS.CreateAccount} component={CreateAccount} />

        <Stack.Screen name={SCREENS.SignUp} component={SignUp} />

        <Stack.Screen name={SCREENS.VendorSignUp} component={VendorSignUp} />

        <Stack.Screen
          name={SCREENS.ForgetPassword}
          component={ForgotPassword}
        />
        <Stack.Screen name={SCREENS.OTP} component={Verification} />
        <Stack.Screen name={SCREENS.ResetPassword} component={ResetPassword} />
        <Stack.Screen
          name={SCREENS.ChangePassword}
          component={ChangePassword}
        />
      </Stack.Navigator>
    </>
  );
}

const styles = StyleSheet.create({});

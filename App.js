import React, { useEffect } from "react";
import { View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import SplashScreen from "react-native-splash-screen";

// Redux Imports
// import { createStore, combineReducers, applyMiddleware } from "redux";
import { store } from "./src/redux/store";
import { Provider } from "react-redux";
import FlashMessage from "react-native-flash-message";
import MainNavigation from "./src/navigation/MainNavigation";
import { COLORS } from "./src/constants";

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 500);
  }, []);
  const FlashMessageRef = React.useRef();

  return (
    <View style={{ flex: 1 }}>
      <Provider store={store}>
        <PaperProvider>
          <MainNavigation />
          <FlashMessage
            ref={FlashMessageRef}
            duration={2000}
            backgroundColor={COLORS.primary1}
            floating
            position="top"
          />
        </PaperProvider>
      </Provider>
    </View>
  );
};

// str = str.replace(/\d(?=\d{4})/g, "*");

export default App;

import firebase from "@react-native-firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoSvd1-NyERW6WqJR_DDw1ApeevccMn9A",
  authDomain: "photomap-29990.firebaseapp.com",
  projectId: "photomap-29990",
  storageBucket: "photomap-29990.appspot.com",
  messagingSenderId: "712034051940",
  appId: "1:712034051940:web:5c0595b17d0986b2037c71",
  measurementId: "G-32QQBH06B5",
  databaseURL: "",
};

export default Firebase = () => {
  if (!firebase.apps.length) {
    return firebase.initializeApp(firebaseConfig);
  } else {
    return firebase.app();
  }
};

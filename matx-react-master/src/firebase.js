import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getStorage } from "firebase/storage";

import "firebase/compat/firestore";
import "firebase/compat/auth";
const apiKey1 = `${"AIzaSyDimSnjk0MlojvT"}`;
const apiKey2 = `${"ZH1H4OhHzPsVSYt32ac"}`;

const firebaseConfig = {
  apiKey: `${apiKey1}${apiKey2}`,
  authDomain: "hiu-interne.firebaseapp.com",
  projectId: "hiu-interne",
  storageBucket: "hiu-interne.appspot.com",
  messagingSenderId: "203815167509",
  appId: "1:203815167509:web:5b8a7da85ca63c8c74901c",
  measurementId: "G-QCV1EKZN8V",
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
export { storage };
const messaging = getMessaging(firebaseApp);
// const storage = firebase.storage();
// export { storage };
export const getTokenCode = (setTokenFound) => {
  const vapidKey1 = "BHQ2xFUdt9yPDbPnIk_B9wHI_Krurgfb79pw4RTGvl-RnMiDmuR";
  const vapidKey2 = "tbIcrQCZFMYy0Ebl2MkX9fcjaUjWUjOe74Xk";
  return getToken(messaging, { vapidKey: `${vapidKey1}${vapidKey2}` })
    .then((currentToken) => {
      if (currentToken) {
        // console.log("current token for client: ", currentToken);
        localStorage.setItem("clientToken", currentToken);
        setTokenFound(true);
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        setTokenFound(false);
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

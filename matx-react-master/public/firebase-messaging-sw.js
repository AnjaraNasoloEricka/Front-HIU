importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

var firebaseConfig = {
  apiKey: "AIzaSyDimSnjk0MlojvTZH1H4OhHzPsVSYt32ac",
  authDomain: "hiu-interne.firebaseapp.com",
  projectId: "hiu-interne",
  storageBucket: "hiu-interne.appspot.com",
  messagingSenderId: "203815167509",
  appId: "1:203815167509:web:5b8a7da85ca63c8c74901c",
  measurementId: "G-QCV1EKZN8V",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

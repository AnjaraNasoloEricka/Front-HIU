import "../fake-db";
import { Provider } from "react-redux";
import { useRoutes } from "react-router-dom";
import { MatxTheme } from "./components";
import { AuthProvider } from "./contexts/JWTAuthContext";
import { SettingsProvider } from "./contexts/SettingsContext";
import { Store } from "./redux/Store";
import routes from "./routes";
import { getTokenCode, onMessageListener } from "../firebase";
import { useState, useEffect } from "react";
import { Button, Row, Col, Toast } from "react-bootstrap";
import { useAlert } from "react-alert";
import { Alert } from '@mui/material';
// import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const content = useRoutes(routes);
  const alert = useAlert()
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({
    title: "",
    body: "",
  });
  const [isTokenFound, setTokenFound] = useState(false);

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          setTokenFound(true);
        }
      });
    } else {
      setTokenFound(true);
    }
  }, []);

  getTokenCode(setTokenFound);

  onMessageListener()
    .then((payload) => {
      console.log('new nofication')
      setShow(true);
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
      
      setShow(false)
    })
    .catch((err) => console.log("failed : ", err));
  return (
    <Provider store={Store}>
      <SettingsProvider>
        <MatxTheme>
          {}
          {/* <AuthProvider>{content}</AuthProvider> */}
          {/* <Toast
            onClose={() => setShow(false)}
            show={show}
            delay={10000}
            autohide
            animation
            style={{ position: "absolute", top: 20, right: 20, minWidth: 200 }}
          >
            <Toast.Header>
              <strong className="mr-auto">{notification.title}</strong>
              <small>just now</small>
            </Toast.Header>
            <Toast.Body>{notification.body}</Toast.Body>
          </Toast> */}
          {content}
        </MatxTheme>
      </SettingsProvider>
    </Provider>
  );
};

export default App;

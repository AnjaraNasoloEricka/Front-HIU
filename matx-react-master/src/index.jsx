import { CssBaseline } from "@mui/material";
import { StyledEngineProvider } from "@mui/styled-engine";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App";
import * as serviceWorker from "./serviceWorker";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
};
ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <AlertProvider template={AlertTemplate} {...options}>
      <BrowserRouter>
        <CssBaseline />
        <App />
      </BrowserRouter>
    </AlertProvider>
  </StyledEngineProvider>,
  document.getElementById("root")
);

// for IE-11 support un-comment cssVars() and it's import in this file
// and in MatxTheme file

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

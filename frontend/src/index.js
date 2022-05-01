import React from "react";
import ReactDOM from "react-dom/client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green, orange } from "@mui/material/colors";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./store";
import { Provider } from "react-redux";
const root = ReactDOM.createRoot(document.getElementById("root"));
const theme = createTheme({
  palette: {
    primary: {
      main: green[500],
    },
    secondary: {
      main: orange[500],
      contrastText: "#ffffff",
    },
    overrides: {
      MuiButton: {
        raisedPrimary: {
          color: "white",
        },
      },
    },
  },
});
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

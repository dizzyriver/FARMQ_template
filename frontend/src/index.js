// src/index.js
import "./styles/global.css"; // Import global CSS here
import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles"; // Correct import for MUI v5
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/store"; // Adjust the path as necessary to where your store is defined
import theme from "./theme"; // Import your custom theme
import "./styles/global.css"; // Import global CSS here

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

// src/App.js
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import store from "./store";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/landing-page" />} />
          <Route path="/landing-page" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

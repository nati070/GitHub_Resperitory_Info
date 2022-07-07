import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import Main from "./components/Main";
// react router dom
import { BrowserRouter } from "react-router-dom";

//react redux
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import RespReducer from "./reducers/RespReducer"; 
import resperitoyReducer from "./features/resperitory/resperitoySlice";

const store = configureStore({reducer : resperitoyReducer})




const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Main />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

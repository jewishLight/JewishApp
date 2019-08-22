import React from "react";
import App from "./src/app";
import { Provider } from "react-redux";
import createStore from "./src/redux";

const store = createStore();
const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default RNRedux;

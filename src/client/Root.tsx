import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./../shared/App";
import { createStore } from "redux";
import rootReducer from "./../store";
import { Provider } from "react-redux";

const store = createStore(
  rootReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

export default Root;

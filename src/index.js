import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { AppConfig } from "./configs";
import { AppRouter } from "./router";
import { Provider } from "react-redux";
import store from "./redux/store"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store} >
      <AppConfig>
        <AppRouter />
      </AppConfig>
    </Provider>
);

reportWebVitals();

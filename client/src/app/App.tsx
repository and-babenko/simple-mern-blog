import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "./app.css";
import { Routing } from "../pages/routes";
import { store } from "../redux/store";

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routing />
      </Provider>
    </BrowserRouter>
  );
};

export default App;

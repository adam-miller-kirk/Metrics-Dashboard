import React from "react";
import { render } from "react-dom";
import Modal from "react-modal";
import { StoreProvider } from "easy-peasy";
import { store } from "./store";
import Dashboard from "./layout/Dashboard";
import "./index.pcss";

Modal.setAppElement("body");

render(
  <StoreProvider store={store}>
    <Dashboard />
  </StoreProvider>,
  document.getElementById("root")
);

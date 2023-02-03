import React from "react";
import { render } from "react-dom";
import Modal from "react-modal";
import Dashboard from "./layout/Dashboard";
import "./index.pcss";

Modal.setAppElement("body");

render(<Dashboard />, document.getElementById("root"));

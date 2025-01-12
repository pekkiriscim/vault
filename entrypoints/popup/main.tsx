import React from "react";
import ReactDOM from "react-dom/client";

import "@/styles/index.css";

import App from "@/entrypoints/popup/App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

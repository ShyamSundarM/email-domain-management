import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import reactToWebComponent from "react-to-webcomponent";
// Import the remote design system styles
import("remoteDesignSystem/DesignSystemRootStyles");

const MyWebComponent = reactToWebComponent(App, React, ReactDOM);
customElements.define("email-domain-management", MyWebComponent);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

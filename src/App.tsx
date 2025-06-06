import { Suspense, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import React from "react";
const SimpleButton = React.lazy(
  () => import("remoteDesignSystem/SimpleButton")
) as React.ComponentType<SimpleButtonProps>;

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading button...</div>}>
        <SimpleButton text="MyButton" />
      </Suspense>
    </div>
  );
}

export default App;

import { Suspense, useState } from "react";
import "./App.css";
import React from "react";
import { DialogProps, PrimaryButtonProps, SimpleButtonProps } from "./Types";
const SimpleButton = React.lazy(
  () => import("remoteDesignSystem/SimpleButton")
) as React.ComponentType<SimpleButtonProps>;
const PrimaryButton = React.lazy(
  () => import("remoteDesignSystem/PrimaryButton")
) as React.ComponentType<PrimaryButtonProps>;
const Dialog = React.lazy(
  () => import("remoteDesignSystem/Dialog")
) as React.ComponentType<DialogProps>;

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading simple button...</div>}>
        <SimpleButton text="MyButton" />
      </Suspense>
      <Suspense fallback={<div>Loading primary button...</div>}>
        <PrimaryButton
          text="My Primary Button"
          disabled={false}
          type="button"
          variant="blue"
        />
      </Suspense>
      <Suspense fallback={<div>Loading dialog...</div>}>
        <Dialog
          TriggerElement={({ clickHandler }) => (
            <PrimaryButton
              text="Open Dialog"
              clickHandler={clickHandler}
              variant="blue"
            />
          )}
          title="My Dialog"
          hasAction={true}
          actionButtonText="Close"
          handleDialogAction={() => console.log("Dialog action triggered")}
        >
          <p>This is the content of the dialog.</p>
        </Dialog>
      </Suspense>
    </div>
  );
}

export default App;

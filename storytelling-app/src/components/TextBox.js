import React from "react";
import { Scrollama, Step } from "react-scrollama";

function TextBox({ setShowSuperconducting, setShowTrappedIon }) {
  const handleStepEnter = ({ data }) => {
    console.log(data);
    if (data === "superconducting") {
      setShowSuperconducting(true);
    } else if (data === "trapped-ion") {
      setShowSuperconducting(true);
      setShowTrappedIon(true);
    }
  };

  const handleStepExit = ({ data, direction }) => {
    if (data === "trapped-ion" && direction === "up") {
      setShowTrappedIon(false);
    } else if (data === "superconducting" && direction === "up") {
      setShowSuperconducting(false);
      setShowTrappedIon(false);
    }
  };

  return (
    <div>
      <Scrollama
        offset={0.5}
        onStepEnter={handleStepEnter}
        onStepExit={handleStepExit}
      >
        <Step data="superconducting">
          <div style={{ minHeight: "50vh", marginTop: "30vh"}}>
            <h2>Superconducting QPUs</h2>
            <p>
              Superconducting QPUs use circuits cooled to near absolute zero to
              create qubits.
            </p>
          </div>
        </Step>
        <Step data="trapped-ion">
          <div style={{ minHeight: "50vh", marginTop: "30vh"}}>
            <h2>Trapped-ion QPUs</h2>
            <p>
              Trapped-ion QPUs use ions suspended in electromagnetic fields.
            </p>
          </div>
        </Step>
      </Scrollama>
    </div>
  );
}

export default TextBox;

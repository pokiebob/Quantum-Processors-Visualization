import React from "react";
import { Scrollama, Step } from "react-scrollama";

function TextBox({ setShowSuperconducting, setShowTrappedIon }) {
  const handleStepEnter = ({ data }) => {
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
          <div style={{ minHeight: "80vh", marginTop: "30vh" }}>
            <h2>Superconducting QPUs</h2>
            <p>
              Superconducting quantum processors use circuits made from
              superconducting materials cooled near absolute zero, where
              electrical current can flow without resistance. Information is
              stored in discrete energy levels of artificial atoms, or
              transmons, and controlled using microwave photons.
            </p>
            <p>
              Superconducting qubits benefit from fast gate speeds and rapid
              scaling. Leading efforts by companies such as IBM and Google have
              steadily increased qubit counts and demonstrated superconducting
              devices with over 50 qubits. Encouragingly, current coherence
              times suggest the potential for exponential improvement, offering
              hope that superconducting technologies can keep pace with
              Schoelkopf’s Law.
            </p>
          </div>
        </Step>
        <Step data="trapped-ion">
          <div style={{ minHeight: "80vh" }}>
            <h2>Trapped-ion QPUs</h2>
            <p>
              Trapped-ion quantum processors use individual ions suspended in
              electromagnetic fields to represent qubits. Quantum information is
              encoded in the internal electronic states of each ion, and laser
              pulses manipulate these states to implement quantum gates.
            </p>
            <p>
              Trapped-ion qubits offer exceptional coherence times due to the
              isolation of ions from their environment. While gate speeds and
              scaling remain challenging, companies like IonQ and Quantinuum
              have advanced the technology through innovations in modular
              architectures and photonic interconnects. These efforts position
              trapped-ion systems as a leading candidate for achieving reliable
              quantum computation.
            </p>
          </div>
        </Step>
      </Scrollama>
    </div>
  );
}

export default TextBox;

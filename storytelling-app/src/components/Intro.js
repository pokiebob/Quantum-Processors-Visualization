import React from "react";

function Intro() {
  return (
    <div style={{ maxWidth: "800px", marginTop: "2vh", textAlign: "center" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
        Bridging the Quantum Gap
      </h1>
      <p style={{ fontSize: "1rem", lineHeight: "1.6" }}>
        Quantum computers today still resemble the age of classical computing in
        the 1950s: limited in scale and feasibility. While progress in quantum
        hardware has been impressive, a critical gap persists between the
        complexity of quantum algorithms and the capabilities of today’s
        hardware, as the current processors struggle with limited qubit counts
        and high error rates.
        <br />
        <br />
        <br />
        <strong>
          Scroll to see how hardware advances are bringing quantum algorithms
          closer to reality.
        </strong>
      </p>
    </div>
  );
}

export default Intro;

import React from "react";
import Title from "./components/Title";
import Intro from "./components/Intro";
import Plot from "./components/Plot";
import TextBox from "./components/TextBox";
import { InView } from "react-intersection-observer";

function App() {

  /* Usestates for syncing textboxes and plot */
  const [showPlot, setShowPlot] = React.useState(false);
  const [superconductingInView, setSuperconductingInView] = React.useState(false);
  const [trappedIonInView, setTrappedIonInView] = React.useState(false);
  const [algorithmInView, setAlgorithmInView] = React.useState(false);


  return (
    <main>
      <Title />

      <section className="intro">
        <Intro />
      </section>

      <InView
        as="div"
        onChange={(inView) => setShowPlot(inView)}
        threshold={0.2}
      >
        <section className="section" style={{ minHeight: "200vh" }}>
          <div>
            <div
              className="plot-fixed"
              style={{
                // Fade and modern ease transition for the plot
                opacity: showPlot ? 1 : 0,
                transform: showPlot
                  ? "translate(-50%, -50%) translateY(0px) scale(1)"
                  : "translate(-50%, -50%) translateY(15px) scale(0.98)",
                transition:
                  "opacity 1s cubic-bezier(0.23, 1, 0.32, 1), " +
                  "transform 1.2s cubic-bezier(0.23, 1, 0.32, 1)", 
              }}                          
            >
              <Plot
                showSuperconducting={superconductingInView}
                showTrappedIon={trappedIonInView}
                showAlgorithm={algorithmInView}
              />
            </div>

            <div className="scrolling-text">
              <TextBox
                setShowSuperconducting={setSuperconductingInView}
                setShowTrappedIon={setTrappedIonInView}
                setShowAlgorithm={setAlgorithmInView}
              />
            </div>
          </div>
        </section>
      </InView>
    </main>
  );
}

export default App;

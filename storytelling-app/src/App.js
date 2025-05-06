import React from 'react';
import Title from './components/Title';
import Intro from './components/Intro';
import Plot from './components/Plot';
import TextBox from './components/TextBox';
import { InView } from 'react-intersection-observer';

function App() {
  const [showPlot, setShowPlot] = React.useState(false);

  // Points visibility state
  const [superconductingInView, setSuperconductingInView] = React.useState(false);
  const [trappedIonInView, setTrappedIonInView] = React.useState(false);

  return (
    <main>
      <Title />

      <section className="intro">
        <Intro />
      </section>

      <InView
        as="div"
        onChange={(inView) => setShowPlot(inView)}
        threshold={0.3}
      >
        <section className="section" style={{ minHeight: '200vh' }}>
          {showPlot && (
            <div>
              <div className="plot-fixed">
                <Plot
                  showSuperconducting={superconductingInView}
                  showTrappedIon={trappedIonInView}
                />
              </div>
              <div className="scrolling-text">
                <TextBox
                  setShowSuperconducting={setSuperconductingInView}
                  setShowTrappedIon={setTrappedIonInView}
                />
              </div>
            </div>
          )}
        </section>
      </InView>
    </main>
  );
}

export default App;

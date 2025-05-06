import React from "react";
import { scaleLog } from "@visx/scale";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { Group } from "@visx/group";
import { Circle } from "@visx/shape";
import data from "../data/qpu-data.json";

function Plot({ showSuperconducting, showTrappedIon }) {
  const width = 500;
  const height = 500;
  const margin = { top: 50, right: 50, bottom: 100, left: 100 };

  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;

  const xScale = scaleLog({
    domain: [1, 100000],
    range: [0, plotWidth],
    base: 10,
  });

  const yScale = scaleLog({
    domain: [1, 0.00001],
    range: [plotHeight, 0],
    base: 10,
  });

  const tickFormatter = (tick) => {
    if (tick === 1) return "1";
    if (tick === 10) return "10";

    const power = Math.log10(tick);
    const superscripts = {
      "-": "⁻",
      0: "⁰",
      1: "¹",
      2: "²",
      3: "³",
      4: "⁴",
      5: "⁵",
      6: "⁶",
      7: "⁷",
      8: "⁸",
      9: "⁹",
    };

    const powerStr = power
      .toString()
      .split("")
      .map((char) => superscripts[char] || char)
      .join("");

    return `10${powerStr}`;
  };

  let superconductingIndex = 0;
  let trappedIonIndex = 0;

  return (
    <svg width={width} height={height} style={{ border: "2px dashed #ccc" }}>
      <Group top={margin.top} left={margin.left}>
        <AxisBottom
          scale={xScale}
          top={plotHeight}
          label="Number of physical qubits"
          tickValues={[1, 10, 100, 1000, 10000, 100000]}
          tickLength={3}
          stroke="#000"
          tickStroke="#000"
          tickLabelProps={(tick) => ({
            fontSize: 14,
            dx: tick === 1 ? -3 : -8,
            dy: 5,
          })}
          labelProps={{
            fontSize: 16,
            dy: 10,
          }}
          tickFormat={tickFormatter}
        />

        <AxisLeft
          scale={yScale}
          label="Average two-qubit gate error rate"
          tickValues={[1, 0.1, 0.01, 0.001, 0.0001, 0.00001]}
          tickLength={3}
          stroke="#000"
          tickStroke="#000"
          tickLabelProps={(tick) => ({
            fontSize: 14,
            dx: tick === 1 ? -17 : -27,
            dy: 5,
          })}
          labelProps={{
            fontSize: 16,
            dx: -10,
          }}
          tickFormat={tickFormatter}
        />

        {/* Data points */}
        {data.map((d, i) => {
          const isVisible =
            (d.type === "superconducting" && showSuperconducting) ||
            (d.type === "trapped-ion" && showTrappedIon);

          const opacity = isVisible ? 0.8 : 0;

          const fill = d.type === "superconducting" ? "#82b6f9" : "#ffc266";
          const stroke = d.type === "superconducting" ? "#0d3d99" : "#cc6600";

          let delay = "0s";
          if (isVisible) {
            if (d.type === "superconducting") {
              delay = `${superconductingIndex * 0.1}s`;
              superconductingIndex++;
            } else if (d.type === "trapped-ion") {
              delay = `${trappedIonIndex * 0.1}s`;
              trappedIonIndex++;
            }
          }

          return d.type === "superconducting" ? (
            <rect
              key={i}
              x={xScale(d.systemSize) - d.connectivityDensity * 3}
              y={yScale(d.errorTolerance) - d.connectivityDensity * 3}
              width={d.connectivityDensity * 6}
              height={d.connectivityDensity * 6}
              fill={fill}
              stroke={stroke}
              strokeWidth={1.5}
              opacity={opacity}
              style={{
                transition: "opacity 0.8s ease",
                transitionDelay: delay,
              }}
            />
          ) : (
            <Circle
              key={i}
              cx={xScale(d.systemSize)}
              cy={yScale(d.errorTolerance)}
              r={d.connectivityDensity * 3}
              fill={fill}
              stroke={stroke}
              strokeWidth={1.5}
              opacity={opacity}
              style={{
                transition: "opacity 0.8s ease",
                transitionDelay: delay,
              }}
            />
          );
        })}
      </Group>
    </svg>
  );
}

export default Plot;

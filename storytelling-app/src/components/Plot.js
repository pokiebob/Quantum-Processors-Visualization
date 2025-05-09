import React from "react";
import { scaleLog } from "@visx/scale";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { Group } from "@visx/group";
import { Circle } from "@visx/shape";
import { useTooltip, useTooltipInPortal, defaultStyles } from "@visx/tooltip";
import data from "../data/qpu-data.json";

function Plot({ showSuperconducting, showTrappedIon, showAlgorithm }) {
  // Responsive sizing for mobile
  const isMobile = window.innerWidth <= 768;
  const width = isMobile ? 400 : 500;
  const height = isMobile ? 300 : 400;

  // Set up SVG dimensions and margins
  const margin = { top: 100, right: 100, bottom: 100, left: 100 };
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;


  // D3 scaling
  const xScale = scaleLog({
    domain: [1, 100000],
    range: [0, plotWidth],
    base: 10,
  });
  const yScale = scaleLog({
    domain: [1, 0.0001],
    range: [plotHeight, 0],
    base: 10,
  });


  // Custom tick formatter for logarithmic scale
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

  // Indeces for animation delays
  let superconductingIndex = 0;
  let trappedIonIndex = 0;

  // Tooltip setup
  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip,
  } = useTooltip();

  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    scroll: true,
  });

  return (
    // SVG container
    <svg
      ref={containerRef}
      width={width}
      height={height}
    >
      <Group top={margin.top} left={margin.left}>
        {/* X and Y axes */}
        <AxisBottom
          scale={xScale}
          top={plotHeight}
          label="Number of qubits"
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
            dx: -30,
          }}
          tickFormat={tickFormatter}
        />

        <AxisLeft
          scale={yScale}
          label="Error Tolerance"
          tickValues={[1, 0.1, 0.01, 0.001, 0.0001]}
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
            (d.type === "trapped-ion" && showTrappedIon) ||
            (d.type === "algorithm" && showAlgorithm);

          const opacity = isVisible ? 0.8 : 0;

          const fill =
            d.type === "superconducting"
              ? "#82b6f9"
              : d.type === "trapped-ion"
              ? "#ffc266"
              : "#999"; 

          const stroke =
            d.type === "superconducting"
              ? "#0d3d99"
              : d.type === "trapped-ion"
              ? "#cc6600"
              : "#333"; 

          let delay = "0s";
          if (isVisible) {
            if (d.type === "superconducting") {
              delay = `${superconductingIndex * 0.2}s`;
              superconductingIndex++;
            } else if (d.type === "trapped-ion") {
              delay = `${trappedIonIndex * 0.2}s`;
              trappedIonIndex++;
            }
          }

          if (d.type === "superconducting") {
            return (
              <rect
                key={i}
                x={xScale(d.systemSize) - d.connectivityDensity * 3}
                y={yScale(d.errorTolerance) - d.connectivityDensity * 3}
                width={d.connectivityDensity * 5}
                height={d.connectivityDensity * 5}
                fill={fill}
                stroke={stroke}
                strokeWidth={1.5}
                opacity={opacity}
                style={{
                  transition: "opacity 0.8s ease",
                  transitionDelay: delay,
                  pointerEvents: isVisible ? "all" : "none",
                }}
                onMouseEnter={() => {
                  showTooltip({
                    tooltipLeft: xScale(d.systemSize) + 40,
                    tooltipTop: yScale(d.errorTolerance) + 100,
                    tooltipData: d.year,
                  });
                }}
                onMouseLeave={() => {
                  hideTooltip();
                }}
              />
            );
          } else if (d.type === "trapped-ion") {
            return (
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
                  pointerEvents: isVisible ? "all" : "none",
                }}
                onMouseEnter={() => {
                  showTooltip({
                    tooltipLeft: xScale(d.systemSize) + 40,
                    tooltipTop: yScale(d.errorTolerance) + 100,
                    tooltipData: d.year,
                  });
                }}
                onMouseLeave={() => {
                  hideTooltip();
                }}
              />
            );
          } else if (d.type === "algorithm") {
            // Rotate rectangle for diamond shape
            return (
              <rect
                key={i}
                x={xScale(d.systemSize) - d.connectivityDensity * 3}
                y={yScale(d.errorTolerance) - d.connectivityDensity * 3}
                width={d.connectivityDensity * 6}
                height={d.connectivityDensity * 6}
                transform={`
                  rotate(45 ${xScale(d.systemSize)} ${yScale(d.errorTolerance)})
                `}
                fill={fill}
                stroke={stroke}
                strokeWidth={1.5}
                opacity={opacity}
                style={{
                  transition: "opacity 0.8s ease",
                  transitionDelay: delay,
                  pointerEvents: isVisible ? "all" : "none",
                }}
                onMouseEnter={() => {
                  showTooltip({
                    tooltipLeft: xScale(d.systemSize) + 40,
                    tooltipTop: yScale(d.errorTolerance) + 60,
                    tooltipData: d.name,
                  });
                }}
                onMouseLeave={() => {
                  hideTooltip();
                }}
              />
            );
          } else {
            return null; 
          }
          
        })}

        {/* Legend inside the plot */}
        <Group top={plotHeight + 50} left={isMobile ? 170 : 260}>
          <rect
            x={0}
            y={0}
            width={12}
            height={12}
            fill="#82b6f9"
            stroke="#0d3d99"
            strokeWidth={1.5}
          />
          <text x={20} y={10} fontSize={12} fill="#000">
            Superconducting
          </text>

          <Circle
            cx={6}
            cy={25}
            r={6}
            fill="#ffc266"
            stroke="#cc6600"
            strokeWidth={1.5}
          />
          <text x={20} y={30} fontSize={12} fill="#000">
            Trapped-ion
          </text>
        </Group>
      </Group>

      {/* Tooltip */}
      {tooltipOpen && (
        <TooltipInPortal
          top={tooltipTop}
          left={tooltipLeft}
          style={defaultStyles}
        >
          {tooltipData}
        </TooltipInPortal>
      )}
    </svg>
  );
}

export default Plot;

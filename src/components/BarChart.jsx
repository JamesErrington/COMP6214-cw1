import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import useComponentSize from "@rehooks/component-size";

export default function BarChart({ data, margin }) {
  const parentRef = useRef(null);
  const d3Ref = useRef(null);

  const { width, height } = useComponentSize(parentRef);

  useEffect(() => {
    if (width > 0 && height > 0 && data) {
      const paddedHeight = height - margin.top - margin.bottom;
      const paddedWidth = width - margin.left - margin.right;

      const max = d3.max(data, function(d) {
        return d.value;
      });

      const svg = d3.select(d3Ref.current);

      svg.selectAll("*").remove();

      svg.attr("width", width).attr("height", height);

      const g = svg
        .append("g")
        .attr("transform", `translate(0, ${margin.top})`);

      const x = d3
        .scaleLinear()
        .domain([0, max])
        .range([0, paddedWidth]);

      g.append("g")
        .attr("transform", `translate(${margin.left}, ${paddedHeight})`)
        .call(d3.axisBottom(x));

      const y = d3
        .scaleBand()
        .domain(data.map(d => d.label))
        .range([0, paddedHeight])
        .padding(0.2);

      g.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y));

      g.selectAll("bar-chart")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", d => x(0) + margin.left)
        .attr("y", d => y(d.label))
        .attr("width", d => x(0))
        .attr("height", y.bandwidth())
        .attr("fill", "#69b3a2");

      g.selectAll("rect")
        .transition()
        .duration(800)
        .attr("y", d => y(d.label))
        .attr("width", d => x(d.value));
    }
  }, [width, height, margin, data]);

  return (
    <div className="chart-wrapper" ref={parentRef}>
      <svg ref={d3Ref} />
    </div>
  );
}

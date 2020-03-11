import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import useComponentSize from "@rehooks/component-size";

import data from "../data/eer-simple.json";

const colors = {
  NEAS: "#C52233",
  EAST: "#C52233",
  NWES: "#C52233",
  YORH: "#C52233",
  EMID: "#C52233",
  WMID: "#C52233",
  LOND: "#C52233",
  SWES: "#C52233",
  SEAS: "#C52233",
  NIRE: "#8CC084",
  SCOT: "#6C91C2",
  WALE: "#FFC15E"
};

export default function UKMap({ selectedRegion, handleSelectRegion }) {
  const parentRef = useRef(null);
  const d3Ref = useRef(null);

  const { width, height } = useComponentSize(parentRef);

  useEffect(() => {
    const svg = d3
      .select(d3Ref.current)
      .attr("width", width)
      .attr("height", height)
      .on("click", function(d) {
        handleSelectRegion("")
      })

    svg.selectAll("*").remove();

    const projection = d3
      .geoAlbers()
      .center([0, 55.4])
      .rotate([4.4, 0])
      .parallels([50, 60])
      .scale(Math.min(height, width) * 5)
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    svg
      .append("g")
      .selectAll("path")
      .data(data.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("id", ({ properties }) => properties.EER13NM)
      .style("stroke", "black")
      .attr("fill", ({ properties }) => colors[properties.EER13NM])
      .on("click", function() {
        d3.event.stopPropagation()
        handleSelectRegion(d3.select(this).attr("id"));
      });
  }, [handleSelectRegion, height, width]);

  useEffect(() => {
    if (selectedRegion === "") {
      d3.select(d3Ref.current)
        .selectAll("path")
        .transition()
        .duration(200)
        .style("opacity", 1);
    } else {
      d3.select(d3Ref.current)
        .selectAll("path")
        .transition()
        .duration(200)
        .style("opacity", 0.3);

      d3.select(`#${selectedRegion}`)
        .transition()
        .duration(200)
        .style("opacity", 1);
    }
  }, [selectedRegion]);

  return (
    <div className="map-holder" ref={parentRef}>
      <svg className="uk-map" ref={d3Ref} />
    </div>
  );
}

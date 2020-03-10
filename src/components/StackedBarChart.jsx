import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import useComponentSize from "@rehooks/component-size";

export default function BarChart({ data, margin, percentage }) {
  const parentRef = useRef(null);
  const d3Ref = useRef(null);

  const [hoveredSubgroup, setHoveredSubgroup] = useState(null);
  const [filteredSubgroup, setFilteredSubgroup] = useState(null);

  const { width, height } = useComponentSize(parentRef);

  useEffect(() => {
    if (width > 0 && height > 0 && data) {
      const normalizedData = [];
      if (percentage) {
        data.rawData.forEach(d => {
          const newDatum = {
            "HE provider": d["HE provider"]
          };
          let total = 0;
          let min = Number.MAX_VALUE;
          for (const subgroup of data.subgroups) {
            if (parseInt(d[subgroup]) < min) {
              min = parseInt(d[subgroup]);
            }
          }
          for (const subgroup of data.subgroups) {
            total += parseFloat(d[subgroup]);
          }
          for (const subgroup of data.subgroups) {
            newDatum[subgroup] = (d[subgroup] / total) * 100;
          }
          normalizedData.push(newDatum);
        });
      }

      const useableData = {
        groups: data.groups,
        subgroups: data.subgroups,
        rawData: percentage ? normalizedData : data.rawData
      };

      const paddedHeight = height - margin.top - margin.bottom;

      const paddedWidth = width - margin.left - margin.right;

      const max = d3.max(
        useableData.rawData.map(d =>
          useableData.subgroups
            .map(e => d[e])
            .reduce((acc, elem) => acc + parseFloat(elem), 0)
        )
      );

      const svg = d3.select(d3Ref.current);

      svg.selectAll("*").remove();

      svg.attr("width", width).attr("height", height);

      const g = svg
        .append("g")
        .attr("transform", `translate(0, ${margin.top})`);

      var x = d3
        .scaleLinear()
        .domain([0, max])
        .range([0, paddedWidth]);

      g.append("g")
        .attr("id", "x-axis")
        .attr("transform", `translate(${margin.left}, ${paddedHeight})`)
        .call(d3.axisBottom(x).tickFormat(d => (percentage ? `${d}%` : d)));

      var y = d3
        .scaleBand()
        .domain(useableData.groups)
        .range([0, paddedHeight])
        .padding(0.2);

      g.append("g")
        .attr("id", "y-axis")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y));

      const color = d3
        .scaleOrdinal()
        .domain(useableData.subgroups)
        .range(d3.schemeDark2);

      const legendSize = 20;
      const legend = svg.append("g").attr("id", "legend");
      legend
        .selectAll("legend-box")
        .data(useableData.subgroups)
        .enter()
        .append("g")
        .attr("class", (d, i) => `subgroup-${i}`)
        .append("rect")
        .attr("x", width - margin.right + 10)
        .attr("y", (d, i) => i * (legendSize + 10))
        .attr("width", legendSize)
        .attr("height", legendSize)
        .style("fill", d => color(d))
        .on("mouseover", function(d) {
          setHoveredSubgroup(
            useableData.subgroups.indexOf(d3.select(this.parentNode).datum())
          );
        })
        .on("mouseleave", function(d) {
          setHoveredSubgroup(null);
        });

      legend
        .selectAll("legend-labels")
        .data(useableData.subgroups)
        .enter()
        .append("text")
        .attr("x", width - margin.right + legendSize + 20)
        .attr("y", (d, i) => i * (legendSize + 10) + legendSize / 1.7)
        .style("fill", d => color(d))
        .text(d => d)
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle");

      legend.attr(
        "transform",
        `translate(0,${height / 2 -
          d3
            .select("#legend")
            .node()
            .getBBox().height /
            2})`
      );

      const subgroups =
        filteredSubgroup === null
          ? useableData.subgroups
          : [useableData.subgroups[filteredSubgroup]];
      const stackedData = d3.stack().keys(subgroups)(useableData.rawData);

      g.append("g")
        .selectAll("g")
        .data(stackedData)
        .enter()
        .append("g")
        .attr("class", (d, i) => `subgroup-${i}`)
        .attr("fill", function(d) {
          return color(d.key);
        })
        .selectAll("rect")
        .data(function(d) {
          return d;
        })
        .enter()
        .append("rect")
        .attr("x", function(d) {
          return x(0) + margin.left;
        })
        .attr("y", function(d) {
          return y(d.data["HE provider"]);
        })
        .attr("width", function(d) {
          return x(0);
        })
        .attr("height", y.bandwidth())
        .on("mouseover", function(d) {
          setHoveredSubgroup(
            useableData.subgroups.indexOf(
              d3.select(this.parentNode).datum().key
            )
          );
        })
        .on("mouseleave", function(d) {
          setHoveredSubgroup(null);
        })
        .on("click", function(d) {
          setFilteredSubgroup(
            useableData.subgroups.indexOf(
              d3.select(this.parentNode).datum().key
            )
          );
        });

      g.selectAll("rect")
        .transition()
        .duration(800)
        .attr("x", function(d) {
          return x(d[0]) + margin.left;
        })
        .attr("y", function(d) {
          return y(d.data["HE provider"]);
        })
        .attr("width", function(d) {
          return x(d[1]) - x(d[0]);
        });
    }
  }, [width, height, margin, data, percentage, filteredSubgroup]);

  useEffect(() => {
    if (hoveredSubgroup === null) {
      d3.select(d3Ref.current)
        .selectAll("rect")
        .style("opacity", 1);
    } else {
      d3.select(d3Ref.current)
        .selectAll("rect")
        .style("opacity", 0.3);

      d3.select(d3Ref.current)
        .selectAll(".subgroup-" + hoveredSubgroup)
        .selectAll("rect")
        .style("opacity", 1);
    }
  }, [hoveredSubgroup]);

  return (
    <div className="chart-wrapper" ref={parentRef}>
      <svg ref={d3Ref} />
    </div>
  );
}

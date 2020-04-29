import React from "react";


import DataCleaning from "./DataCleaning";
import DataModelling from "./DataModelling";
import DataVisualisation from "./DataVisualisation";

export default function TextFrame() {
  return (
    <div id="text-start" className="text-frame">
      <div className="text-title">
        <h1>Comp 6214 Open Data Coursework</h1>
      </div>
      <div className="text-overlay">
        <div className="main-text">
          <div className="what-text">
            <h2>What is this?</h2>
            <p>
              This site is a visualisation made for the COMP 6214 Open Data
              Innovation module at the University of Southampton. It shows
              information about the demographics of universities in the UK using
              2017 data from <a href="https://www.hesa.ac.uk/">HESA</a>.
            </p>
            <h2>What can I look at?</h2>
            <p>
              Information for different regions of the UK can be filtered by
              clicking on the map on the left, or from the dropdown under the
              chart. By default, total student numbers are shown but this can be
              changed to show breakdowns by Gender, Age, Disability Status, and
              Ethnicity.
            </p>
            <p>
              Within each different demographic, the different groups can be
              highlighted by hovering over the bars, or the legend on the right.
              You can drill down into the data by clicking on a group to hide
              the other bars, which can be useful to compare value in some
              cases.
            </p>
            <p>
              You can also change the displayed subgroup using the filters below
              the chart, and choose between showing data as a percentage or the
              absolute values.
            </p>
          </div>
          <div className="how-text">
            <DataCleaning />
            <DataModelling />
            <DataVisualisation />
          </div>
          <div className="who-text">
            <h2>Who made this?</h2>
            <p>Made by James Errington (jde1g16)</p>
            <p>
              Built using <a href="https://reactjs.org/">React</a>,{" "}
              <a href="https://d3js.org/">D3.js</a>, and{" "}
              <a href="https://fontawesome.com/">FontAwesome</a>
            </p>
            <p>
              UK GeoJSON sourced from{" "}
              <a href="http://martinjc.github.io/UK-GeoJSON/">
                http://martinjc.github.io/UK-GeoJSON/
              </a>
            </p>
            <p>
              Various examples were examined and adapted, most notably from{" "}
              <a href="https://www.d3-graph-gallery.com/">d3-graph-gallery</a> (
              <a href="https://www.d3-graph-gallery.com/barplot.html">
                Barplot
              </a>{" "}
              and{" "}
              <a href="https://www.d3-graph-gallery.com/choropleth.html">
                Choloropleth Map
              </a>
              ),
            </p>
            <p>
              <a href="https://bost.ocks.org/mike/map/">
                https://bost.ocks.org/mike/map/
              </a>{" "}
              and{" "}
              <a href="https://towardsdatascience.com/command-line-cartography-uk-election-edition-4c2ba6054799">
                https://towardsdatascience.com/command-line-cartography-uk-election-edition-4c2ba6054799
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";

import DataCleaning from "./DataCleaning";
import DataModelling from "./DataModelling";
import DataVisualisation from "./DataVisualisation";

export default function TextFrame() {
  return (
    <div className="text-frame">
      <div className="text-curve-wrapper">
        <div className="text-curve">
          <h1>Comp 6214 Open Data Coursework</h1>
          <h2>Data cleaning, modelling, and visualisation</h2>
        </div>
      </div>
      <div className="text-overlay">
        <div className="main-text">
          <div className="what-text">
            This shows data about universities in the UK
          </div>
          <div className="how-text">
            <DataCleaning />
            <DataModelling />
            <DataVisualisation />
          </div>
          <div className="who-text"></div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";

import BarChart from "./BarChart";
import StackedBarChart from "./StackedBarChart";

const regionOptions = [
  {
    label: "London",
    value: "LOND"
  },
  {
    label: "Wales",
    value: "WALE"
  },
  {
    label: "Northern Ireland",
    value: "NIRE"
  },
  {
    label: "Scotland",
    value: "SCOT"
  },
  {
    label: "Eastern",
    value: "EAST"
  },
  {
    label: "South West",
    value: "SWES"
  },
  {
    label: "South East",
    value: "SEAS"
  },
  {
    label: "North West",
    value: "NWES"
  },
  {
    label: "North East",
    value: "NEAS"
  },
  {
    label: "East Midlands",
    value: "EMID"
  },
  {
    label: "West Midlands",
    value: "WMID"
  },
  {
    label: "Yorkshire and Humberside",
    value: "YORH"
  },
  {
    label: "United Kingdom",
    value: ""
  }
];

const fieldOptions = [
  {
    label: "Total Students",
    value: "Total students"
  },
  {
    label: "Gender",
    value: "Gender"
  },
  {
    label: "Age",
    value: "Age"
  },
  {
    label: "Disability",
    value: "Disability"
  },
  {
    label: "Ethnicity",
    value: "Ethnicity"
  }
];

function formatData(inputData, selectedField) {
  if (selectedField === "Total students") {
    return inputData.map(d => ({
      label: d["HE provider"],
      value: parseInt(d[selectedField])
    }));
  }

  let subgroups = [];
  switch (selectedField) {
    case "Gender":
      subgroups = ["Female", "Male", "Other"];
      break;
    case "Age":
      subgroups = [
        "20 and under",
        "21-24",
        "25-29",
        "30 and over",
        "Age unknown"
      ];
      break;
    case "Disability":
      subgroups = ["Known to have a disability", "No known disability"];
      break;
    case "Ethnicity":
      subgroups = [
        "White",
        "Black",
        "Asian",
        "Other ethnicity (including mixed)",
        "Ethnicity not known"
      ];
      break;
    default:
      break;
  }

  return {
    rawData: inputData,
    groups: inputData.map(d => d["HE provider"]),
    subgroups
  };
}

export default function VisualFrame({
  rawData,
  selectedRegion,
  handleSelectRegion
}) {
  const [selectedField, setSelectedField] = useState({
    label: "Total Students",
    value: "Total students"
  });
  const [percentage, setPercentage] = useState(true);

  const selectedData = formatData(rawData[selectedRegion], selectedField.value);
  const regionLabel = regionOptions.find(
    region => region.value === selectedRegion
  ).label;

  return (
    <>
      <div className="chart-title">
        <h1>
          {regionLabel} - {selectedField.label}
        </h1>
      </div>
      <div className="chart-holder">
        {selectedField.value === "Total students" ? (
          <BarChart
            data={selectedData}
            margin={{ top: 50, right: 250, bottom: 50, left: 250 }}
          />
        ) : (
          <StackedBarChart
            data={selectedData}
            margin={{ top: 50, right: 250, bottom: 50, left: 250 }}
            percentage={percentage}
          />
        )}
      </div>
      <div className="filter-row">
        <div className="selection-row">
          <h3>Show me</h3>
          <select
            value={selectedField.value}
            onChange={event =>
              setSelectedField({
                value: event.target.value,
                label:
                  event.target.options[event.target.options.selectedIndex].text
              })
            }
          >
            {fieldOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <h3>statistics for the</h3>
          <select
            value={selectedRegion}
            onChange={event => handleSelectRegion(event.target.value)}
          >
            {regionOptions.map(region => (
              <option key={region.value} value={region.value}>
                {region.label}
              </option>
            ))}
          </select>
          <h3>region</h3>
        </div>
        {selectedField.value !== "Total students" && (
          <div className="percentage-row">
            <h3>as a</h3>
            <input
              id="percentage-radio"
              type="radio"
              name="percentage"
              value={true}
              checked={percentage}
              onChange={() => setPercentage(true)}
            />
            <label htmlFor="percentage-radio">Percentage value</label>
            <h3>or an</h3>
            <input
              id="absolute-radio"
              type="radio"
              name="percentage"
              value={false}
              checked={!percentage}
              onChange={() => setPercentage(false)}
            />
            <label htmlFor="absolute-radio">Absolute value</label>
          </div>
        )}
      </div>
    </>
  );
}

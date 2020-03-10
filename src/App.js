import React, { useState, useEffect } from "react";
import * as d3 from "d3";

import csvData from "./data/Comp6214Data.csv";

import MainFrame from "./components/MainFrame";
import TextFrame from "./components/TextFrame";

import "./App.scss";

async function loadData() {
  const data = await d3.csv(csvData);
  const grouped = data.reduce((acc, elem) => {
    const region = elem["Region of HE provider"];
    if (acc[region] === undefined) {
      acc[region] = [];
    }
    acc[region].push(elem);
    return acc;
  }, {});

  return grouped;
}

export default function App() {
  const [loading, setIsLoading] = useState(true);
  const [rawData, setRawData] = useState({});

  useEffect(() => {
    loadData().then(result => {
      setRawData(result);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="App">
      {loading === false && <MainFrame rawData={rawData} />}
      <TextFrame />
    </div>
  );
}

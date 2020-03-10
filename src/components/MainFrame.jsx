import React, { useState, useRef } from "react";
import * as d3 from "d3"
import { useScrollPosition } from "@n8tb1t/use-scroll-position";

import UKMap from "./UKMap";
import VisualFrame from "./VisualFrame";

export default function MainFrame({ rawData }) {
  const [selectedRegion, setRegion] = useState("");

  const d3Ref = useRef(null)

  useScrollPosition(
    ({ prevPos, currPos }) => {
      d3.select(d3Ref.current).style("opacity", 1 - (1.5 * window.pageYOffset) / window.innerHeight)
    },
    [window.innerHeight, window.pageYOffset]
  );

  return (
    <div className="main-frame" ref={d3Ref}>
      <div className="map-frame">
        <UKMap selectedRegion={selectedRegion} handleSelectRegion={setRegion} />
      </div>
      <div className="visual-frame">
        <VisualFrame
          rawData={rawData}
          selectedRegion={selectedRegion}
          handleSelectRegion={setRegion}
        />
      </div>
    </div>
  );
}

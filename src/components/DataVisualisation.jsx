import React from "react"
import { ReactComponent as ChartIcon} from "@fortawesome/fontawesome-free/svgs/solid/chart-bar.svg"

export default function DataCleaning() {
  return (
    <div className="data-visualisation">
      <div className="text-icon chart-icon">
        <ChartIcon />
      </div>
      <h2>Data Visualisation</h2>
    </div>
  )
}
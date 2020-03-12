import React from "react";
import { ReactComponent as BroomIcon } from "@fortawesome/fontawesome-free/svgs/solid/broom.svg";

export default function DataCleaning() {
  return (
    <div className="data-cleaning">
      <div className="text-icon clean-icon">
        <BroomIcon />
      </div>
      <h2>Data Cleaning</h2>
      <p>
        There were two main stages to the cleaning of the raw data: first the
        erroneous cells were identified and corrected in the two sheets, and
        then the data was transformed into a more useable CSV format by removing
        superfluous cells and editing ambiguous headers.
      </p>
      <p>
        To detect errors in the cells, the data was imported into Google Sheets
        and the "Data Validation" function was used to detect values in the
        table that were not valid whole numbers. An upper maximum of 100000 was
        used in order to flag values that may be too large for manual review.
        The "EQ" function was used to check if the "INSTID", "UKPRN", "Region of
        HE provider", and "HE provider" were consistent between the two sheets.
      </p>
      <h4>Summary of errors in Sheet 1</h4>
      <table>
        <thead>
          <tr>
            <th>Cell</th>
            <th>Erroneous Value</th>
            <th>Corrected Value</th>
            <th>Error type</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>CJ64</td>
            <td>nil</td>
            <td>0</td>
            <td></td>
          </tr>
          <tr>
            <td>CC104</td>
            <td>Nil</td>
            <td>0</td>
            <td></td>
          </tr>
          <tr>
            <td>CC105</td>
            <td>NULL</td>
            <td>0</td>
            <td></td>
          </tr>
          <tr>
            <td>CC106</td>
            <td>ZERO</td>
            <td>0</td>
            <td></td>
          </tr>
          <tr>
            <td>BX145</td>
            <td>157575575775</td>
            <td>1545</td>
            <td></td>
          </tr>
          <tr>
            <td>CJ182</td>
            <td>fifteen</td>
            <td>15</td>
            <td></td>
          </tr>
          <tr>
            <td>AK11</td>
            <td>Total other EEC domicile</td>
            <td>Total other EU domicile</td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <h4>Summary of errors in Sheet 2</h4>
      <table>
        <thead>
          <tr>
            <th>Cell</th>
            <th>Erroneous Value</th>
            <th>Corrected Value</th>
            <th>Error type</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>D45</td>
            <td>University of Derbyshire</td>
            <td>University of Derby</td>
            <td></td>
          </tr>
          <tr>
            <td>U40</td>
            <td>29430XYYTY</td>
            <td>29430</td>
            <td></td>
          </tr>
          <tr>
            <td>L55</td>
            <td>Nan</td>
            <td>0</td>
            <td></td>
          </tr>
          <tr>
            <td>D99</td>
            <td>Oxford Uni at Brookes</td>
            <td>Oxford Brookes University</td>
            <td></td>
          </tr>
          <tr>
            <td>B101</td>
            <td>32XDFRG87</td>
            <td>10005127</td>
            <td></td>
          </tr>
          <tr>
            <td>C141</td>
            <td>NARNIA</td>
            <td>EAST</td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <p>
        After the errors had been corrected, the data was further cleaned by
        removing the special characters (†, §§, ‡) and all the extraneous
        information at the top and bottom. The headers of Sheet 1 were cut down
        to one single row in order to produce a proper CSV format, which
        involved amending the headings to be more specific. Finally, the data
        from the two sheets was merged into one single table.
      </p>
    </div>
  );
}

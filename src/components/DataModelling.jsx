import React from "react";
import { ReactComponent as LinkIcon } from "@fortawesome/fontawesome-free/svgs/solid/link.svg";

export default function DataCleaning() {
  return (
    <div className="data-modelling">
      <div className="text-icon link-icon">
        <LinkIcon />
      </div>
      <h2>Data Modelling</h2>
      <p>I used the RDF Extension in OpenRefine to assist with the creation of the semantic model of the data. This allowed me to easily map concepts in the model to columns of the dataset, and have the entire model populated automatically from the rows.</p>
      <a href={`${process.env.PUBLIC_URL}/model.ttl`} target="_blank" rel="noopener noreferrer">The model</a>
      <p>I primarily used the class and property definitions provided by <a href="www.schema.org">schema.org</a> to define the logical concepts of the data - for example, the regions were defined as AdministrativeAreas, the universities as CollegeOrUniversity, and the contains and containedIn properties were used to link them. I also used the <a href="https://www.hesa.ac.uk/collection/c18041">HESA schema</a> definition for the UKPRN and INSTID of each university.</p>
      <p>Each region was placed under the 'region' subname, and I used the INSTID of the unviversites as the unique indentifier for their URIs under the 'institution' subname. Each institution has a number of schema.org Datasets, which themselves contain Observations that hold the actual data for each column. Observations are linked to the column names through the 'measuredProperty' property that relates to a custom class that encapsulates each logical section of the original data, and the 'measuredValue' property holds the actual data point.</p>
      <p>For example, I created a Gender class of type rdfs:Container that holds the column values for the gender related values. Each university has a schema:dataset property that links to a schema:Dataset class, which itself has a schema:measuredVariable property expressing that this dataset is for the Gender type. The dataset has :hasObservation properties that provide links to the schema:Observation classes and the actual values for the columns.</p>
    </div>
  );
}

import React from "react";
import { ReactComponent as ChartIcon } from "@fortawesome/fontawesome-free/svgs/solid/chart-bar.svg";

export default function DataCleaning() {
  return (
    <div className="data-visualisation">
      <div className="text-icon chart-icon">
        <ChartIcon />
      </div>
      <h2>Data Visualisation</h2>
      <p>
        The data I chose to visualise for this project all comes from Sheet 2 of
        the original dataset, which is more about the different demographic
        breakdowns of the universities. I chose this because I think it allows
        for more interesting analysis of the different institutions, and is more
        varied than Sheet 1 which just has information about the residency of
        different stages of student.
      </p>
      <p>
        The audience for this visualisation is anyone interested in learning
        about and comparing demographic information about universities in
        different regions of the UK. This could be for example a potential
        student interesting in finding out the percentages of women at different
        universities, or how the breakdown of ethnicities varies around the
        country.
      </p>
      <p>
        I used a map to present the different regions of the UK as this is a
        very natural format for displaying geographical data, and allows for
        easy interaction by clicking on the different regions. I used a standard
        bar chart for the breakdown of total students as this dataset is a
        simple 1 category -> 1 numerical value relationship, and bar charts make
        it easy to compare values quickly and easily.
      </p>
      <p>
        For the other demographic visualisations I used stacked bar charts, as
        each groupig has multiple subgroups which form the stack. Whilst this
        sort of data can be shown using a pie chart, the advantage of using
        stacked bars is that it can display a lot of dense data very easily and
        make it all comparable, which is very useful as some of the regions
        (i.e. London) have a lot of universities. Using stacked bars also allows
        for switching between percentage and absolute values very efficiently.
      </p>
      <p>
        For interactivity, the ability to hover over groups in the stacked bars
        and highlight just that group, and then futher being able to drill down
        into the data aids enormously with comparisons, especially in data sets
        with high variance between the universities. I also added functionality
        to change the visual display using standard form options below the
        chart, which aids with accessibility for example on mobile devices. I
        arranged these controls as part of a natural language layout in order to
        improve user experience as they can easily choose what they want to see
        displayed, when compared with just a grid of dropdowns and radio
        buttons.
      </p>
    </div>
  );
}

import React from "react";
import "./instructions.css";
function Instructions() {
  return (
    <div class="row">
      <div id="instructions-container">
        <h3>About</h3>
        <div>
          <p>
            Work Vis visualizes staffing information for the Media technology
            and interaction design division of the EECS school at KTH.
            <br />
            Use of this service by anyone other than the division’s director of
            studies (Jarmo Laaksolahti) is somewhat unauthorized.
          </p>
          <h3>Instructions</h3>
          <img class="img-fluid" src="teacheroverview.png" />
          <p>
            All teachers are represented by bars in the <b>teacher overview</b>.
            Hovering over one displays the name and balance (allocated vs.
            contracted hours).
            <br />A red bar means <i>‘overallocated’</i>, a blue means{" "}
            <i>‘underallocated’</i> and teachers represented by green bars are{" "}
            <i>properly allocated</i> (within a 2% margin of error).
          </p>
          <br />
          <img class="img-fluid" src="courseoverview.png" />
          <p>
            Hovering over a teacher bar also displays which courses that teacher
            is teaching in the <b>course overview</b>.<br />
            Grey courses are properly allocated, whereas yellow/light orange
            courses require teacher allocations and red/dark orange courses need
            task hour allocations.
          </p>
          <br />
          <img class="img-fluid" src="search.png" />
          <p>
            From the <b>search row</b>, it is possible to select only the red or
            the yellow courses in the overview, toggle between the course and
            teacher overviews (if a detail view is open), or search for a
            particular teacher or course (either by its code or short name) by
            flipping the switch next to the input field.
          </p>
          <br />
          <img class="img-fluid" src="teacherdetail.png" />
          <p>
            Clicking a teacher’s bar in the overview takes us to the{" "}
            <b>teacher detail view</b>, displaying the workload in the various
            courses (try hovering over the stacked bars and legend!), as well as
            the individual’s balance between contracted (<i>“kontering”</i>) and
            allocated (<i>“bemannad”</i>) hours.
            <br />
            The <i>“Gru Balance”</i> numbers show this balance for the beginning
            of the year, and the projected balance for the end of the year.
          </p>
          <br />
          <img class="img-fluid" src="coursedetail.png" />
          <p>
            Clicking a course in the overview takes us to the{" "}
            <b>course detail view</b>, displaying the workload of the allocated
            teachers and the staffing status for each course component
            (allocated vs. budgeted hours).
            <br />
            Light green components are properly allocated, whereas dark green
            signals overallocation, red means underallocation, an outer orange
            circle means that teachers haven’t been properly allocated to that
            component, and a mere dotted circle shows that the component isn’t
            budgeted for in the course.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Instructions;

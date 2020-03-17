import React from "react";
import "./about.css";
function AboutContent({ exit }) {
  const imgstyle = { width: "100%" };
  const clicked = _ => exit("no");
  return (
    <div className="linespacing">
      <div id="instructions-container">
        <div className="flex flex-row">
          <div>
            <h3>What is StaffViz?</h3>
            <button onClick={e => exit(false)} className="exitDetailsButton">
              X
            </button>
          </div>
        </div>

        <p>VIDEO</p>
        <br />
        <h4>Background</h4>
        <div>
          <p>
            As director of studies, one of the tasks is to allocate teacher
            assets so that each course given by the school the coming year is
            properly staffed. This process has thus far been documented in
            spreadsheets, where, although each entry resides at a logical
            position, the difficulty of acquiring an overview of the data often
            proves to be an obstacle in the workflow.
            <br />
            Furthermore, the director must repeatedly describe the system to the
            perplexed teachers when they are shown their individual numbers
            during one-on-one planning sessions.
            <br />
            We hope that by visualizing this data, both the director of studies
            and teachers will quickly be able to sift out the needs and
            priorities hidden within the spreadsheet tables.
          </p>
          <br />
          <h4>Goals</h4>
          <ul>
            <li>
              Provide a comprehensive overview of which courses need staffing
              and the status of their individual components, as well as which
              teachers are available for allocation and their individual
              workload.
            </li>

            <li>
              Eliminate the tedious process of having to scroll through many
              rows of tabular data to find relevant information.
            </li>
          </ul>
          <br />
          <h4>Challenges</h4>
          <ul>
            <li>
              Translating the spreadsheet data into logical visualizations.
            </li>
            <li>
              Provide an easy-to-understand tool that teachers will comprehend
              within seconds of starting their one-on-one meetings with the
              director of studies.
            </li>
          </ul>
          <br />
          <h4>Visual structures</h4>
          <p>
            The teachers are represented with bars, which are color coded
            depending on the balance between each teacher’s allocated and
            contracted hours.
          </p>
          <p>
            For an individual teacher, stacked bars display the number of
            allocated hours for the various course components of each course
            that teacher is working with, as well as the allocation/contract
            balance.
          </p>
          <p>
            The courses are represented with boxes, which are divided into
            periods (half-semesters) and clustered according to whether they are
            given in only that period.
            <br />
            These are color coded depending on the need for additional teacher
            allocations. For an individual course, stacked bars again display
            course components allocations for each teacher, while colored
            circles inform about the status of each course component.
          </p>
          <br />
          <h4>Learning objectives reached</h4>
          <p>
            We have achieved our goal of translating a labyrinth of tabular
            spreadsheet data into comprehensive visualizations, thus
            facilitating the director of studies’ task of ensuring that all the
            school’s courses are sufficiently staffed.
          </p>
          <br />

          <h4>The Team</h4>
          <p></p>
          <div className="team">
            <div className="column">
              <div className="card"></div>
              <img src="leila.png" alt="Leila" style={imgstyle} />
              <div className="container">
                <h3>Leila Englund</h3>
                <p className="title">UX, prototype</p>
                <p>
                  Creating the interactive prototype and coming up with
                  solutions to visualize the data in best possible way.
                  Designing different elements to the website was also something
                  that Leila contributed with.
                </p>
                <p>
                  <i>leilae@kth.se</i>
                </p>
              </div>
            </div>

            <div className="column">
              <div className="card">
                <img src="arnar.png" alt="Arnar" style={imgstyle} />
                <div className="container">
                  <h3>Arnar Pétursson</h3>
                  <p className="title">Front-end</p>
                  <p>
                    Processed the raw data into a data structure more suitable
                    to work with. General visual mappings and realizing user
                    needs. Programmed frontend based on prototypes produced by
                    the team.
                  </p>
                  <p>
                    <i>arnarp@kth.se</i>
                  </p>
                </div>
              </div>
            </div>

            <div className="column">
              <div className="card">
                <img src="arda.png" alt="Arda" style={imgstyle} />
                <div className="container">
                  <h3>Arda Mutlu</h3>
                  <p className="title">Back-end</p>
                  <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                  <p>
                    <i>ardam@kth.se</i>
                  </p>
                </div>
              </div>
            </div>

            <div className="column">
              <div className="card">
                <img src="axel.png" alt="Axel" style={imgstyle} />
                <div className="container">
                  <h3>Axel Johansson</h3>
                  <p className="title">UX, prototype</p>
                  <p>
                    Axel has been involved in the visual mappings and structures
                    designs and layout, as well as created interactive
                    prototypes to present these. He has also produced
                    instructive content, contributed to the creation of the
                    website and maintained stakeholder contact.
                  </p>
                  <p>
                    <i>axj@kth.se</i>
                  </p>
                </div>
              </div>
            </div>

            <div className="column">
              <div className="card">
                <img src="alex.png" alt="Alex" style={imgstyle} />
                <div className="container">
                  <h3>Alexander Heikinaho</h3>
                  <p className="title">Front-end</p>
                  <p>
                    Alex has been helped with designing the inital visual
                    structures as well as mapping data to its visual components.
                    His main responsibility was developing the frontend of the f
                  </p>
                  <p>
                    <i>alehei@kth.se</i>
                  </p>
                </div>
              </div>
            </div>

            <div className="column">
              <div className="card">
                <img src="favio.png" alt="Favio" style={imgstyle} />
                <div className="container">
                  <h3>Favio Andres Acosta David</h3>
                  <p className="title">Data</p>
                  <p>
                    Helped the team to figure out how the data works and what
                    will be the challenges to face based on the user needs
                    (school coordinators). In the same way, Favio helped to
                    rearrange the main data variables to deal with for the
                    project purposes.
                  </p>
                  <p>
                    <i>faad@kth.se</i>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutContent;

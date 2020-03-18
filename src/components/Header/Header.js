import React, { useState } from "react";
import "./header.css";
import About from "../About/About";
import Instructions from "../Instructions/Instructions";
function Header() {
  const [dispAbout, setDispAbout] = useState(false);
  const [dispIntructions, setDispIntructions] = useState(true);

  return (
    <div className="header flex flexrow">
      <span className="header-title">
        <strong>Work Viz</strong>
        <button onClick={_ => setDispAbout(!dispAbout)}>
          About the project
        </button>
        <button onClick={_ => setDispIntructions(true)}> What is this?</button>
      </span>
      <About display={dispAbout} onExit={setDispAbout} />
      {/* {dispIntructions && <Instructions onExit={setDispIntructions} />} */}
    </div>
  );
}

export default Header;

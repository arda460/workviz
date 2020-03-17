import React, { useState } from "react";
import "./header.css";
import About from "../About/About";
function Header() {
  const [displayModal, setDispModal] = useState(false);
  const test = _ => console.log("hello");
  return (
    <div className="header flex flexrow">
      <span className="header-title">
        <strong>Work Vis</strong>
        <button onClick={_ => setDispModal(!displayModal)}>About</button>
      </span>
      <About display={displayModal} onExit={test} />
    </div>
  );
}

export default Header;

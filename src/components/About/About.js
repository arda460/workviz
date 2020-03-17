import React, { useState } from "react";
import AboutContent from "./About-text";
function About({ display, onExit }) {
  const exit = _ => onExit(false);
  const test = d => console.log(d);
  return (
    <div className="about-modal">
      {display && <AboutContent exit={onExit} />}
    </div>
  );
}

export default About;

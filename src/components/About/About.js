import React, { useState } from "react";
import AboutContent from "./About-text";
function About({ display, onExit }) {
  return (
    <div className="about-modal">
      {display && <AboutContent exit={onExit} />}
    </div>
  );
}

export default About;

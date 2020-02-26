import React, { useState } from "react";

const GlobalStateContext = React.createContext({});

const GlobalStateProvider = ({ children }) => {
  const [personHover, setPersonHover] = useState(null);
  const [isHoveringPerson, setIsHoveringPerson] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [showTeacherDetails, setShowTeacherDetails] = useState(false);

  return (
    <GlobalStateContext.Provider
      value={{
        personHover,
        setPersonHover,
        isHoveringPerson,
        setIsHoveringPerson,
        selectedPerson,
        setSelectedPerson,
        showTeacherDetails,
        setShowTeacherDetails
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};
const GlobalStateConsumer = GlobalStateContext.Consumer;
export { GlobalStateContext, GlobalStateProvider, GlobalStateConsumer };

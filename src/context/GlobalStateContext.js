import React, { useState } from "react";

const GlobalStateContext = React.createContext({});

const GlobalStateProvider = ({ children }) => {
  const [personHover, setPersonHover] = useState(null);
  const [courseHover, setCourseHover] = useState(null);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [filterTeachers, setFilterTeachers] = useState(null);
  const [showTeacherDetails, setShowTeacherDetails] = useState(false);
  const [courseDetails, setCourseDetails] = useState(false);

  return (
    <GlobalStateContext.Provider
      value={{
        personHover,
        setPersonHover,
        courseHover,
        setCourseHover,
        selectedPerson,
        setSelectedPerson,
        showTeacherDetails,
        setShowTeacherDetails,
        courseDetails,
        setCourseDetails,
        filterTeachers,
        setFilterTeachers
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};
const GlobalStateConsumer = GlobalStateContext.Consumer;
export { GlobalStateContext, GlobalStateProvider, GlobalStateConsumer };

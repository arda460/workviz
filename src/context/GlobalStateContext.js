import React, { useState } from "react";

const GlobalStateContext = React.createContext({});

const GlobalStateProvider = ({ children }) => {
  const [personHover, setPersonHover] = useState(null);
  const [courseHover, setCourseHover] = useState(null);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [filterTeachers, setFilterTeachers] = useState(null);
  const [showTeacherDetails, setShowTeacherDetails] = useState(false);
  const [courseDetails, setCourseDetails] = useState(false);
  const [courseOverview, setCourseOverview] = useState(null);
  const [displayDetails, setDisplayDetails] = useState(false);
  const [detailView, setDetailView] = useState(null);
  const [overView, setOverView] = useState(true);

  const updateBarClick = person => {
    setSelectedPerson(person);
    setShowTeacherDetails(true);
    setDetailView("TeacherDetails");
    setDisplayDetails(true);
  };

  const courseClicked = e => {
    if (e === false) return;
    setDetailView("CourseDetails");
    setCourseDetails(e);
    setDisplayDetails(true);
  };

  const exitTeacherDetails = () => {
    setSelectedPerson(null);
    setDisplayDetails(false);
    setOverView(true);
  };

  const swapDetails = _ => {
    if (detailView === "null") return;
    detailView === "TeacherDetails"
      ? setDetailView("CourseDetails")
      : setDetailView("TeacherDetails");
  };

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
        updateBarClick,
        setFilterTeachers,
        courseOverview,
        setCourseOverview,
        displayDetails,
        setDisplayDetails,
        detailView,
        setDetailView,
        overView,
        setOverView,
        courseClicked,
        exitTeacherDetails
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};
const GlobalStateConsumer = GlobalStateContext.Consumer;
export { GlobalStateContext, GlobalStateProvider, GlobalStateConsumer };

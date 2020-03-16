import React, { useState, useContext } from "react";
import { DataContext } from "./DataContext";

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
  const { summary20, loading } = useContext(DataContext);

  const updateBarClick = person => {
    setSelectedPerson(person);
    setShowTeacherDetails(true);
    setDetailView("TeacherDetails");
    setDisplayDetails(true);
    setCourseDetails(false);
  };

  const personClick = person => {
    if(!loading) {
      const tmp = {
        name: person,
        value: summary20[person]["Balance (%)"],
        vt: summary20[person]["VT Courses"].map(c => c["Course Code"]),
        ht: summary20[person]["HT Courses"].map(c => c["Course Code"])
      }
      setPersonHover(tmp);
    }
    updateBarClick(person);
  };

  const courseClicked = e => {
    if (e === false) return;
    setPersonHover(null);
    setDetailView("CourseDetails");
    setCourseDetails(e);
    setDisplayDetails(true);
  };

  const exitTeacherDetails = () => {
    setSelectedPerson(null);
    setDisplayDetails(false);
    setOverView(true);
    setCourseDetails(false);
    setPersonHover(null);
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
        exitTeacherDetails,
        personClick
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};
const GlobalStateConsumer = GlobalStateContext.Consumer;
export { GlobalStateContext, GlobalStateProvider, GlobalStateConsumer };

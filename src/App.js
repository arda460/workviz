import React, { useContext } from "react";
import "./App.css";
import DetailView from "./components/DetailView/DetailView";
import Spinner from "./components/Spinner/Spinner";
import OverView from "./components/OverView/OverView";
import Search from "./components/Search/Search";
import Header from "./components/Header/Header";

import { DataContext } from "./context/DataContext";

function App() {
  const { loading } = useContext(DataContext);

  if (loading) {
    return (
      <div className="App">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="App fade-in">
      <Header />
      <DetailView />
      <Search />
      <OverView />
    </div>
  );
}

export default App;

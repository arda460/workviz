import React from "react";
import "./App.css";
import BarChart from "./components/BarChart/BarChart";

//Set properties for the barchart
const margin = {
  top: 20,
  right: 10,
  bottom: 20,
  left: 10
};
const height = 500;
const width = 500;

//super simple data, normally this would be much more complicated
const dummyData = [
  {
    name: "apple",
    value: 3
  },
  {
    name: "pen",
    value: 2
  },
  {
    name: "banana",
    value: 7
  },
  {
    name: "apple-pen",
    value: 5
  },
  {
    name: "superbanana",
    value: 11
  }
];

let props = {
  margin,
  height,
  width,
  data: dummyData
};

function App() {
  return (
    <div className="App">
      <BarChart {...props} />
    </div>
  );
}

export default App;

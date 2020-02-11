import React, { useState } from "react";
import "./App.css";
import BarChart from "./components/InteractiveBarChart/InteractiveBarChart";

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
const initData = [
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

//initdata2 is used for the interactive barchart
const initData2 = [
  {
    name: "apple",
    value: 12
  },
  {
    name: "door-hinge",
    value: 5
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
    value: 3
  }
];

//simple functions that swaps data. this is to trigger a new render from React
function swapDummyData(x) {
  if (x === initData) {
    return initData2;
  } else return initData;
}

function App() {
  const [dummyData, setDummyData] = useState(initData);

  let props = {
    margin,
    height,
    width,
    data: dummyData
  };

  // setTestVar(testVar + 1)
  return (
    <div className="App">
      <BarChart {...props} />
      <button onClick={() => setDummyData(swapDummyData(dummyData))}>
        test button plz ignore!
      </button>
    </div>
  );
}

export default App;

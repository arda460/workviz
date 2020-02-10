import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const margin = {
  top: 20,
  right: 10,
  bottom: 20,
  left: 10
};
const height = 500;
const width = 500;

//super simple data, normally this will be much more complicated
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
    name: "pen-apple apple-pen",
    value: 5
  },
  {
    name: "superbanana",
    value: 11
  }
];
//all values above should come from props in BarChart...

function BarChart(props) {
  //create a svg reference for d3 to prevent conflicts
  let svgRef = useRef(null);

  const draw = () => {
    const svg = d3
      .select(svgRef.current)
      .style("width", width)
      .style("heigth", height);

    const g = svg
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const x = d3
      .scaleBand()
      .range([0, width - margin.left - margin.right])
      .domain(dummyData.map(x => x.name))
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .range([height - margin.top - margin.bottom, 0]) //range is the pixelsize of the graph
      .domain([0, d3.max(dummyData.map(fruit => fruit.value))]); //domain is the range of values

    //prettier-ignore
    const bars = g
      .selectAll("UltimateBarChart")
      .data(dummyData)
      .join("rect")
      .attr("x", d => {return x(d.name)})
      .attr("y", d=> {return y(d.value)-40})
      .attr("width", x.bandwidth())
      .attr("height", d => {return (height  - y(d.value))})
      .attr("fill","cadetblue")

    let xAxis = d3.axisBottom(x);

    svg
      .append("g")
      .attr(
        "transform",
        "translate(" + 0 + "," + (height - margin.bottom) + ")"
      )
      .call(xAxis);
  };

  useEffect(() => {
    draw();
  });

  return (
    <div>
      <p>this will be a barchart </p>
      <svg ref={svgRef} width={width} height={height}></svg>
    </div>
  );
}

export default BarChart;

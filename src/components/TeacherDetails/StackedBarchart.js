import React, { useRef, useEffect, useCallback } from "react";
import * as d3 from "d3";
import { DataContext } from "../../context/DataContext";

function StackedBarchart({ data }) {
  const margin = { top: 30, left: 30, bottom: 30, right: 30 };
  const width = 200;
  const height = 200;

  const svgRef = useRef(null);
  // const sum = d3.sum(data.map(d => d.value));
  const keys = Object.keys(data[0]).filter(k => k !== "group");
  const groups = data.map(d => d.group);

  const svg = d3
    .select(svgRef.current)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const draw = () => {
    let stack = d3.stack().keys(keys);
    let series = stack(data);
    let max = series[series.length - 1][0][1];
    console.log(series);

    const x = d3
      .scaleBand()
      .domain(groups)
      .range([margin.left, width - margin.right])
      .padding([0.2]);

    const y = d3
      .scaleLinear()
      .domain([0, max])
      .range([height - margin.top, 0 + margin.bottom]);

    const color = d3
      .scaleOrdinal()
      .domain(keys)
      .range(d3.schemeCategory10);

    // Show the bars
    svg
      .append("g")
      .selectAll("g")
      // Enter in the stack data = loop key per key = group per group
      .data(series)
      .enter()
      .append("g")
      .attr("fill", function(d) {
        return color(d.key);
      })
      .selectAll("rect")
      //   // enter a second time = loop subgroup per subgroup to add all rectangles
      .data(function(d) {
        console.log(d);
        return d;
      })
      .enter()
      .append("rect")
      .attr("x", function(d) {
        return x(d.data.group);
      })
      .attr("y", function(d) {
        return y(d[1]);
      })
      .attr("height", function(d) {
        return y(d[0]) - y(d[1]);
      })
      .attr("width", x.bandwidth());

    // console.log(data);

    // const x = d3
    //   .scaleBand()
    //   .range([0, width - margin.left - margin.right])
    //   .domain([subgroups]);

    // const stackedData = d3
    //   .stack()
    //   .keys(subgroups)
    //   .value();
    // // console.log(stackedData);
    // // console.log(data);

    // // var dataStack = d3.stack()(data..map(function(fruit) {
    // //   return data.map(function(d) {
    // //     return {x: parse(d.year), y: +d[fruit]};
    // //   });
    // // }));

    // const y = d3
    //   .scaleLinear()
    //   .range([margin.top, height - margin.bottom])
    //   .domain([0, sum]);
  };
  useEffect(() => {
    draw();
  }, [data]);
  return (
    <>
      <svg ref={svgRef}></svg>
    </>
  );
}

export default StackedBarchart;

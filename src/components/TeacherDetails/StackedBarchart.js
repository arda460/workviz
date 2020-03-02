import React, { useRef, useEffect, useCallback } from "react";
import * as d3 from "d3";
import { DataContext } from "../../context/DataContext";

function StackedBarchart(props) {
  const { data, margin, width, height } = props;
  const divRef = useRef(null);
  const svgRef = useRef(null);
  const keys = Object.keys(data[0]).filter(k => k !== "group");
  const groups = data.map(d => d.group);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const draw = useCallback(() => {
    const svg = d3
      .select(svgRef.current)
      .html(null)
      .attr("width", width)
      .attr("height", height);

    let stack = d3.stack().keys(keys);

    const g = svg.append("g");

    let series = stack(data);

    if (series.length === 0) {
      return <span>Values empty.</span>;
    }
    let max = series[series.length - 1][0][1];

    const y = d3
      .scaleBand()
      .domain(groups)
      .range([margin.top, height - margin.bottom])
      .padding([0.2]);

    const x = d3
      .scaleLinear()
      .domain([0, max])
      .range([width - margin.right, margin.left]);

    const color = d3
      .scaleOrdinal()
      .domain(keys)
      .range(d3.schemeCategory10);

    // Show the bars
    g.selectAll("g")
      .data(series)
      .join("g")
      .attr("fill", function(d) {
        return color(d.key);
      })
      .attr("class", d => `${d.key} bar`)

      .selectAll("rect")
      .data(function(d) {
        return d;
      })
      .enter()
      .append("rect")
      .attr("y", function(d) {
        return y(d.data.group);
      })
      .attr("x", function(d) {
        return x(d[1]);
      })
      .attr("width", function(d) {
        return x(d[0]) - x(d[1]);
      })
      .attr("height", y.bandwidth())
      .exit()
      .remove();
    const legend = svg
      .append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .selectAll("g")
      .data(keys.slice().reverse())
      .enter()
      .append("g")
      .attr("transform", function(d, i) {
        return `translate(${5 + i * 22},20)`;
      });

    legend
      .append("rect")
      .attr("x", 19)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", color)
      .on("mouseenter", d => {
        console.log(window.pageXOffset);
        svg.selectAll(`.bar:not(.${d})`).style("opacity", 0.5);
        svg
          .select(`.${d}`)
          .attr("fill", "blue")
          .style("opacity", 1);
        // svg.select(".bar").attr("fill", "red");
      })
      .on("mouseleave", d => {
        svg.select(`.${d}`).attr("fill", color(d));
        svg.selectAll(".bar").style("opacity", 1);
      });
  });
  useEffect(() => {
    draw();
  }, [draw, svgRef]);
  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default StackedBarchart;

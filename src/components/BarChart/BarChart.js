import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import "./BarChart.css";

const BarChart = props => {
  const {
    margin,
    height,
    width,
    smallBarLimit,
    onHover,
    onClick,
    data
  } = props;
  const svgRef = useRef(null);

  const draw = () => {
    const svg = d3
      .select(svgRef.current)
      .style("width", width)
      .style("height", height + 100);

    let max = d3.max(data, d => {
      return d.value;
    });

    const g = svg
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const x = d3
      .scaleBand()
      .range([0, width - margin.left - margin.right]) //range is the pixelsize of the svg element for said axis
      .domain(data.map(x => x.name)) //domain is the range of values from the data
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .range([0, height])
      .domain([-max, max]);

    const rectY = d => {
      let val = d.value;
      if (Math.abs(val) < smallBarLimit) {
        return height - y(smallBarLimit);
      }
      return d.value < 0 ? y(0) : height - y(d.value);
    };
    const rectHeight = d => {
      let val = d.value;
      if (Math.abs(val) < smallBarLimit) {
        return y(2 * smallBarLimit) - y(0);
      }
      return d.value < 0 ? y(0) - y(d.value) : y(d.value) - y(0);
    };

    const bars = g
      .selectAll("barchart")
      .data(data)
      .join("rect")
      .attr("id", d => `bar${d.name.replace(" ", "")}`)
      .attr("x", d => {
        return x(d.name);
      })
      .attr("y", d => rectY(d))
      .attr("width", x.bandwidth())
      .attr("height", d => rectHeight(d))
      .attr("class", d => {
        if (d.value > smallBarLimit) {
          return "Positive";
        } else if (d.value <= -smallBarLimit) {
          return "Negative";
        }
        return "Small";
      });

    const barMouseEvents = g
      .selectAll("rect")
      .on("mouseover", e => {
        onHover(e);
      })
      .on("mouseleave", e => onHover(""))
      .on("click", e => onClick(e.name));

    //prettier-ignore
    let line = `M ${margin.left} ${y(0) + margin.top} H ${width - margin.right} `;

    svg
      .append("g")
      .append("path")
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", "1px")
      .attr("d", line);
  };

  useEffect(() => {
    draw();
    return () => {
      d3.selectAll("g")
        .exit()
        .remove();
    };
  }, [data]);
  return (
    <div>
      <svg className="BarChartOverview" ref={svgRef}></svg>
    </div>
  );
};

export default BarChart;

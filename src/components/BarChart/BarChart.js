import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import "./BarChart.css";

const BarChart = props => {
  const [tooltip, setTooltip] = useState(false);
  const [tooltiptext, setTooltipText] = useState("");
  const [hoverPerson, setHoverPerson] = useState(null);

  const axisOffset = 25;
  const {
    margin,
    height,
    width,
    smallBarLimit,
    onHover,
    onClick,
    courseHover,
    searchData,
    data
  } = props;

  const svgRef = useRef(null);
  const divRef = useRef(null);

  const x = d3
    .scaleBand()
    .range([0, width - margin.left - margin.right]) //range is the pixelsize of the svg element for said axis
    .domain(data.map(x => x.name)) //domain is the range of values from the data
    .padding(0.1);

  const max = d3.max(data, d => {
    return d.value;
  });

  const y = d3
    .scaleLinear()
    .range([axisOffset + margin.top, height - axisOffset - margin.bottom])
    .domain([-max, max]);

  const draw = () => {
    const svg = d3
      .select(svgRef.current)
      .style("width", width)
      .style("height", height)
      .html(null);
    // const tooltip = d3.select(divRef.current);

    const g = svg
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const checkFocus = d => {
      if (courseHover) {
        let ht = d.ht.filter(c => c === courseHover);
        let vt = d.vt.filter(c => c === courseHover);
        if (ht.length > 0 || vt.length > 0) {
          return 1;
        }
        return 0.2;
      }
      if (searchData) {
        if (searchData[d.name]) {
          return 1;
        } else {
          return 0.2;
        }
      }
      return 1;
    };
    const rectY = d => {
      let val = d.value;

      if (Math.abs(val) < smallBarLimit) {
        return height - y(smallBarLimit);
      }
      return d.value < 0 ? y(0) + axisOffset : height - y(d.value) - axisOffset;
      // axisOffset * 2;
    };

    const getMousePos = e => {
      console.log(d3.clientPoint(e.target, e));
      console.log(d3.clientPoint(e.target, e));
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
      })
      .style("opacity", checkFocus)
      .on("mouseover", d => {
        setTooltipText(d);
        setTooltip(true);

        svg
          .selectAll("tooltip")
          .data([d])
          .join(enter => enter.append("text"))
          .attr("class", "tooltip")
          .attr("x", x(d.name) + x.bandwidth() + margin.left)
          .attr("y", rectY(d))
          .text(d => d.name)
          .attr("text-anchor", "middle")
          .transition()
          .attr("y", rectY(d) + 8)
          .attr("opacity", 1);
      })
      .on("mouseenter", d => {
        setHoverPerson(d);
        onHover(d);
      })
      .on("mouseleave", d => {
        setHoverPerson(null);
        onHover(null);
        svg.select(".tooltip").remove();
      })
      .on("click", d => {
        onClick(d.name);
      });

    let line = `M ${margin.left} ${y(0) + axisOffset + margin.top} H ${width -
      margin.right} `;
    let line2 = `M ${margin.left} ${y(0) - axisOffset + margin.top} H ${width -
      margin.right} `;

    let y0 = `M ${margin.left} ${y(0) + margin.top} H ${width - margin.right} `;

    svg
      .append("g")
      .append("path")
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", "1px")
      .attr("d", line)
      .style("stroke-dasharray", "3,3");

    svg
      .append("g")
      .append("path")
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", "1px")
      .attr("d", line2)
      .style("stroke-dasharray", "3,3");

    svg
      .selectAll(".tooltip")
      .transition()
      .duration(200)
      .attr("y", 50)
      .attr("opacity", 1);
  };

  useEffect(() => {
    draw();
    return () => {
      d3.selectAll("g")
        .exit()
        .remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  return (
    <div className="TeacherBarChart">
      {hoverPerson == null ? (
        <br />
      ) : (
        `${hoverPerson.name}, ${hoverPerson.value} %`
      )}
      <div ref={divRef}></div>
      <svg className="BarChartOverview" ref={svgRef}></svg>
    </div>
  );
};

export default BarChart;

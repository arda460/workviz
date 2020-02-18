import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import "./BarChart.css";

const BarChart = props => {
  const margin = { top: 20, left: 10, bottom: 20, right: 10 };

  const height = 300;
  const width = 1600;
  const svgRef = useRef(null);

  //this f
  const handleData = data => {
    return data
      .filter(teacher => teacher.Name !== "")
      .filter(teacher => teacher["Balance ()"] !== "")
      .map(row => {
        return { name: row.Name, balance: Number(row["Balance ()"]) };
      });
  };

  const draw = propdata => {
    const sortedProps = propdata.sort((a, b) =>
      d3.descending(a.balance, b.balance)
    );

    const svg = d3
      .select(svgRef.current)
      .style("width", width)
      .style("height", height + 100);

    let data = sortedProps;

    let max = d3.max(data, d => {
      return d.balance;
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

    //prettier-ignore
    const bars = g
      .selectAll("teacherbars")
      .data(data)
      .join("rect")
      .attr("id",d => `bar${d.name.replace(" ", "")}`)
      .attr("x", d => { return x(d.name); })
      .attr("y", d => (d.balance < 0 ? y(0) : height - y(d.balance)))
      .attr("width", x.bandwidth())
      .attr("height", d =>
        d.balance < 0 ? y(0) - y(d.balance) : y(d.balance) - y(0)
      )
      .attr("fill", d => {
        if (d.balance > 1) {
          return "red";
        } else {
          return "cadetblue";
        }
      })

    const barMouseover = g
      .selectAll("rect")
      .on("mouseover", e => {
        props.selectPerson(`${e.name}, Balance: ${e.balance} % `);
      })
      .on("mouseleave", e => props.selectPerson(""));

    const barClicked = g.selectAll("rect").on("mouseup", e => {
      console.log(e.name + " clicked");
    });
  };
  d3.csv("./Data/2020-small-dash.csv")
    .then(handleData)
    .then(draw);

  return (
    <div>
      <svg className="BarChartOverview" ref={svgRef}></svg>
    </div>
  );
};

export default BarChart;

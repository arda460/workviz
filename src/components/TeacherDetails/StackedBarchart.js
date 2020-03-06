import React, { useRef, useEffect, useCallback } from "react";
import * as d3 from "d3";
import { DataContext } from "../../context/DataContext";

function SpeechBubbleLeft(text) {
  return (
    <foreignObject x="10" y="110" width="100" height="100">
      <div className="speech-bubble-left">Kontering</div>
    </foreignObject>
  );
}

function StackedBarchart(props) {
  const { data, margin, width, height, barWidth } = props;
  const divRef = useRef(null);
  const svgRef = useRef(null);
  const keys = Object.keys(data[0])
    .filter(k => k !== "group")
    .filter(k => k !== "Kontering");
  // console.log(keys);
  const kontering = data[0].Kontering;
  // console.log(data);
  const groups = data.map(d => d.group);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const draw = useCallback(() => {
    const svg = d3
      .select(svgRef.current)
      .html(null)
      .attr("width", width)
      .attr("height", height);

    let stack = d3
      .stack()
      .keys(keys)
      .value((d, key) => d[key].work);

    const g = svg.append("g");
    let series = stack(data);
    // console.log(data);
    // console.log(series);
    // return;
    if (series.length === 0) {
      return <span>Values empty.</span>;
    }
    let max = series[series.length - 1][0][1];
    const setColor = d => {
      let type = data[0][d.key].type;

      if (type === "ht") {
        return "chartreuse";
      } else if (type === "vt") {
        return "pink";
      } else {
        return color(d.key);
      }
    };
    const y = d3
      .scaleBand()
      .domain(groups)
      .range([margin.top, height - margin.bottom])
      .padding([0.2]);

    const x = d3
      .scaleLinear()
      .domain([0, max])
      .range([margin.left, width - margin.right]);

    let konteringX = x(kontering.work);
    let kontLine = d3.line()([
      [konteringX, 10],
      [konteringX, 55]
    ]);
    let workLine = d3.line()([
      [x(max), 10],
      [x(max), 55]
    ]);

    const color = d3
      .scaleOrdinal()
      .domain(keys)
      .range(d3.schemeCategory10);
    const highlightBar = d => {
      svg.selectAll(`.bar`).style("opacity", 0.5);
      svg
        .select(`.${d}`)

        .style("opacity", 1);
    };

    // Show the bars
    svg
      .selectAll("g")
      .data(series)
      .join("g")
      .attr("fill", setColor)
      .attr("class", d => `${d.key} bar`)
      .on("mouseenter", d => highlightBar(d.key))
      .on("mouseleave", d => {
        svg.selectAll(".bar").style("opacity", 1);
      })
      .selectAll("rect")
      .data(function(d) {
        return d;
      })
      .enter()
      .append("rect")
      .attr("y", d => {
        return y(d.data.group);
      })
      .attr("x", function(d) {
        return x(d[0]);
      })
      .attr("width", function(d) {
        return x(d[1]) - x(d[0]);
      })
      .attr("height", barWidth)
      .exit()
      .remove();
    // let bubbleleft = <SpeechBubbleLeft />;
    let bubbleText = {};

    if (konteringX < x(max)) {
      bubbleText.left = "Kontering";
      bubbleText.right = "Bemannad HCT";
    } else {
      bubbleText.left = "Bemannad HCT";
      bubbleText.right = "Kontering";
    }

    svg
      .append("foreignObject")
      .attr("x", Math.min(konteringX, x(max)) - 95)
      .attr("y", 10)
      .attr("width", 100)
      .attr("height", 100)
      .append("xhtml:div")
      .attr("class", "speech-bubble-left")
      .html(bubbleText.left);

    svg
      .append("foreignObject")
      .attr("x", Math.max(konteringX, x(max)))
      .attr("y", 10)
      .attr("width", 100)
      .attr("height", 100)
      .append("xhtml:div")
      .attr("class", "speech-bubble-right")
      .html(bubbleText.right);

    svg
      .append("path")
      .attr("class", "kontering-path")
      .attr("d", kontLine)
      .attr("stroke", "black");
    svg
      .append("path")
      .attr("class", "workload-path")
      .attr("d", workLine)
      .attr("stroke", "black");
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

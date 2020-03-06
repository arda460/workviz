import React, { useRef, useEffect, useCallback } from "react";
import * as d3 from "d3";
import "./StackedBarchartVertical.css";
function StackedBarchartVertical(props) {
  const { data, margin, width = 200, height = 200 } = props;

  const divRef = useRef(null);
  const svgRef = useRef(null);

  let keys = new Set();
  data.forEach(c => Object.keys(c.keys).map(x => keys.add(x)));

  const groups = data.map(x => x.group);
  const values = data.map(v => v.keys);

  let hexcolors = [
    "#EC9747",
    "#FAAD5F",
    "#FCD26C",
    "#C9D897",
    "#365780",
    "#7BBFCC",
    "#9DD0D1"
  ];
  /* 
  structure
  group: "DH2632 H"
  keys: {Frl: "12", Ex: "94", Ku: "6"}
  



  keys: {Adm,Frl,Ex,Ku,Ovn,Ha,La}
  */

  let stack = d3
    .stack()
    .keys(Array.from(keys))
    .value((d, key) => {
      return d.keys[key];
    });

  const stackedData = stack(data);

  const draw = useCallback(() => {
    const svg = d3
      .select(svgRef.current)
      .attr("height", height)
      .attr("width", width)
      .html(null);

    const g = svg.append("g");
    const findMax = d => {
      let m = 0;
      for (let index = 0; index < groups.length; index++) {
        m = Math.max(m, d[index][1]);
      }
      return m;
    };

    const max = findMax(stackedData[stackedData.length - 1]);
    const x = d3
      .scaleBand()
      .domain(groups)
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, max])
      .range([height - margin.bottom, margin.top]);

    const color = d3
      .scaleOrdinal()
      .domain(keys)
      .range(hexcolors);

    g.selectAll("g")
      .data(stackedData)
      .join("g")
      .attr("fill", d => color(d.key))
      .attr("class", d => `${d.key} bar`)
      .selectAll("rect")
      .data(d => {
        return d;
      })
      .enter()

      .append("rect")
      .attr("x", d => {
        return x(d.data.group);
      })
      .attr("y", d => y(d[1]))
      .attr("width", x.bandwidth())
      .attr("height", d => y(d[0]) - y(d[1]))
      .exit()
      .remove();

    svg
      .append("g")
      .attr("class", "course-lables")
      .selectAll("g")
      .data(groups)
      .enter()
      .append("text")
      .attr("y", y(0) + 15)
      .attr("x", d => x(d) + x.bandwidth() / 2)
      .attr("text-length", `${x.bandwidth()}px`)
      .text(d => d);
  });

  useEffect(() => {
    draw();
  }, [data]);
  return (
    <div className="flex flexrow">
      <div className="teacher-chart">
        <svg ref={svgRef}></svg>
      </div>
      <div className="sLabels">
        <div className="colorLabel">
          <div className="labelFor"></div>
          <p>Föreläsning</p>
        </div>
        <div className="colorLabel">
          <div className="labelOvn"></div>
          <p>Övning</p>
        </div>
        <div className="colorLabel">
          <div className="labelLa"></div>
          <p>Laboration</p>
        </div>
        <div className="colorLabel">
          <div className="labelHa"></div>
          <p>Handledning</p>
        </div>
        <div className="colorLabel">
          <div className="labelEx"></div>
          <p>Examination</p>
        </div>
        <div className="colorLabel">
          <div className="labelKu"></div>
          <p>Kursutveckling</p>
        </div>
        <div className="colorLabel">
          <div className="labelAdm"></div>
          <p>Administration</p>
        </div>
      </div>
    </div>
  );
}

export default StackedBarchartVertical;

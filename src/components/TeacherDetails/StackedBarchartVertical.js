import React, { useRef, useEffect, useState, useCallback } from "react";
import * as d3 from "d3";
import "./StackedBarchartVertical.css";
function StackedBarchartVertical(props) {
  const { data, margin, width = 200, height = 200 } = props;
  const [legendHover, setLegendHover] = useState(null);
  const [groupHover, setGroupHover] = useState(false);

  const divRef = useRef(null);
  const svgRef = useRef(null);

  let keys = new Set();
  data.forEach(c => Object.keys(c.keys).map(x => keys.add(x)));

  const groups = data.map(x => x.group);
  const NCourses = groups.length;

  let hexcolors = [
    "#EC9747",
    "#FAAD5F",
    "#FCD26C",
    "#C9D897",
    "#365780",
    "#7BBFCC",
    "#9DD0D1"
  ];
  let colors = {
    Adm: "#EC9747",
    Ha: "#FAAD5F",
    Frl: "#FCD26C",
    Ovn: "#C9D897",
    La: "#365780",
    Ex: "#7BBFCC",
    Ku: "#9DD0D1"
  };
  /* 
  data structure
  group: "DH2632 H"

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

    const g = svg.append("g").attr("class", "stacks");
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

    // let barWidth;
    // if (NCourses <9){
    //   barWidth = 50
    // }else{barWidth = x.bandwidth()}

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
      .attr("fill", d => colors[d.key])
      .attr("class", d => `${d.key} bar`)
      .on("mouseenter", d => {
        setGroupHover(d.key);
        console.log(d);
      })
      .on("mouseleave", d => setGroupHover(null))
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
      .on("mouseenter", d => console.log(d[1] - d[0]))
      .exit()
      .remove();

    svg
      .append("g")
      .attr("class", "yaxis")
      .attr("transform", `translate(50,0)`)
      .call(d3.axisLeft(y));

    svg
      .append("g")
      .attr("class", "axis-label")
      .append("text")
      .attr("x", -height / 2)
      .attr("y", 15)
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .text("Hours");
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

    if (legendHover) {
      g.selectAll(".bar").attr("opacity", 0.2);
      g.select(`.${legendHover}`).attr("opacity", 1);
    }
  });

  useEffect(() => {
    draw();
  }, [data, legendHover]);

  function ColorLabel({ text, keyword, isHover }) {
    let classname = `label${keyword}`;
    let style = { opacity: 1 };

    if (isHover && isHover !== keyword) {
      style.opacity = 0.2;
    }

    return (
      <div className="colorLabel">
        <div
          className={`${classname}`}
          onMouseEnter={_ => setLegendHover(keyword)}
          onMouseLeave={_ => setLegendHover(null)}
          style={style}
        ></div>
        <p>{text}</p>
      </div>
    );
  }
  return (
    <div className="flex flexrow">
      <div className="teacher-chart">
        <svg ref={svgRef}></svg>
      </div>
      <div className="teacher-legend sLabels">
        <ColorLabel text="Föreläsning" keyword="Frl" isHover={groupHover} />
        <ColorLabel text="Övning" keyword="Ovn" isHover={groupHover} />
        <ColorLabel text="Laboration" keyword="La" isHover={groupHover} />
        <ColorLabel text="Handledning" keyword="Ha" isHover={groupHover} />
        <ColorLabel text="Examination" keyword="Ex" isHover={groupHover} />
        <ColorLabel text="Kursutveckling" keyword="Ku" isHover={groupHover} />
        <ColorLabel text="Administration" keyword="Adm" isHover={groupHover} />
      </div>
    </div>
  );
}

export default StackedBarchartVertical;

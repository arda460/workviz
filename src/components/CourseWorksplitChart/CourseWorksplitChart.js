import React, { useRef, useEffect, useCallback } from "react";
import * as d3 from "d3";
import "./CourseWorksplitChart.css";

export default function CourseWorksplitChart(props) {
    const { d } = props;
    const height = 160;
    const width = 900;
    const margin = { top: 10, right: 10, bottom: 10, left: 20 };
    const svgRef = useRef(null);

    const data = [
        { group: 'Föreläsning', Budgeted: parseFloat(d['Föreläsning (Frl)  Budgeted']), Allocated: parseFloat(d['Föreläsning (Frl)  Allocated']) },
        { group: 'Övning', Budgeted: parseFloat(d['Övning (Ovn)  Budgeted']), Allocated: parseFloat(d['Övning (Ovn)  Allocated']) },
        { group: 'Laboration', Budgeted: parseFloat(d['Övning (Ovn)  Budgeted']), Allocated: parseFloat(d['Övning (Ovn)  Allocated']) },
        { group: 'Handledning', Budgeted: parseFloat(d['Handledning (Ha)  Budgeted']), Allocated: parseFloat(d['Handledning (Ha)  Allocated']) },
        { group: 'Examination', Budgeted: parseFloat(d['Examination (Ex)  Budgeted']), Allocated: parseFloat(d['Examination (Ex)  Allocated']) },
        { group: 'Kursutveckling', Budgeted: parseFloat(d['Kursutveckling (Ku)  Budgeted']), Allocated: parseFloat(d['Kursutveckling (Ku)  Allocated']) },
        { group: 'Administration', Budgeted: parseFloat(d['Administration (Adm)  Budgeted']), Allocated: parseFloat(d['Administration (Adm)  Allocated']) }
    ];

    const subgroups = ['Budgeted', 'Allocated'];
    const groups = ['Föreläsning', 'Övning', 'Laboration', 'Handledning', 'Examination', 'Kursutveckling', 'Administration'];

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const draw = useCallback(() => {
        d3.select(svgRef.current).html(null);

        const svg = d3.select(svgRef.current)
            .style("width", width + margin.left + margin.right)
            .style("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        const x = d3.scaleBand()
            .domain(groups)
            .range([0, width])
            .padding(0.2);

        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).tickSize(0));

        const y = d3
            .scaleLinear()
            .domain([0, d3.max(data, d => d.Budgeted)])
            .range([height, 0]);

        svg.append("g")
            .call(d3.axisLeft(y));

        const xSubgroup = d3.scaleBand()
            .domain(subgroups)
            .range([0, x.bandwidth()])
            .padding([0.05])

        const color = d3.scaleOrdinal()
            .domain(subgroups)
            .range(['#e41a1c', '#377eb8']);

        svg.append("g")
            .selectAll("g")
            // Enter in data = loop group per group
            .data(data)
            .enter()
            .append("g")
            .attr("transform", function (d) { return "translate(" + x(d.group) + ",0)"; })
            .selectAll("rect")
            .data(function (d) { return subgroups.map(function (key) { return { key: key, value: d[key] }; }); })
            .enter().append("rect")
            .attr("x", function (d) { return xSubgroup(d.key); })
            .attr("y", function (d) { return y(d.value); })
            .attr("width", xSubgroup.bandwidth())
            .attr("height", function (d) { return height - y(d.value); })
            .attr("fill", function (d) { return color(d.key); });
    });

    useEffect(() => {
        draw();
      }, [draw, svgRef]);

    return (
        <div className="coursewsContainer">
            <svg className="coursewsChart" ref={svgRef}></svg>
        </div>
    );
}
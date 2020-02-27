import React, { useRef, useState, useEffect } from "react";
import * as d3 from "d3";
import "./CourseWorksplitChart.css";

const colors = d3.scaleOrdinal(d3.schemeCategory10);
const format = d3.format(".2f");

const XAxis = ({ top, bottom, left, right, height, scale }) => {
    const axis = useRef(null);

    useEffect(() => {
        d3.select(axis.current).call(d3.axisBottom(scale));
    });

    return (
        <g
            className="axis x"
            ref={axis}
            transform={`translate(${left}, ${height - bottom})`}
        />
    );
};

const YAxis = ({ top, bottom, left, right, scale }) => {
    const axis = useRef(null);

    useEffect(() => {
        d3.select(axis.current).call(d3.axisLeft(scale));
    });

    return (
        <g className="axis y" ref={axis} transform={`translate(${left}, ${top})`} />
    );
};

const RectContainer = ({ data, x, y, height, top, bottom }) => {
    return (
        <g transform={`translate(${x(data.name)}, ${y(data.value)})`}>
            <rect
                width={x.bandwidth()}
                height={height - bottom - top - y(data.value)}
                opacity={0.3}
                fill={'#A9A9A9'}
            />
            <text
                transform={`translate(${x.bandwidth() / 2}, ${-2})`}
                textAnchor="middle"
                alignmentBaseline="baseline"
                fill="grey"
                fontSize="10"
            >
                {format(data.value)}
            </text>
        </g>
    );
};

const RectFill = ({ data, x, y, height, top, bottom }) => {
    return (
        <g transform={`translate(${x(data.name)}, ${y(data.value)})`}>
            <rect
                width={x.bandwidth()}
                height={height - bottom - top - y(data.value)}
                opacity={0.3}
                fill={colors(data.name)}
            />
            <text
                transform={`translate(${x.bandwidth() / 2}, ${-2})`}
                textAnchor="middle"
                alignmentBaseline="baseline"
                fill="grey"
                fontSize="10"
            >
                {format(data.value)}
            </text>
        </g>
    );
};



export default function CourseWorksplitChart(props) {
    const { d } = props;
    const height = 250;
    const width = 650;
    const top = 60;
    const right = 30;
    const bottom = 30;
    const left = 30;

    const data = [
        { id: 'barFöreläsning', name: 'Föreläsning', value: parseFloat(d['Föreläsning (Frl)  Budgeted']) },
        { id: 'barÖvning', name: 'Övning', value: parseFloat(d['Övning (Ovn)  Budgeted']) },
        { id: 'barLaboration', name: 'Laboration', value: parseFloat(d['Laboration (La)  Budgeted']) },
        { id: 'barHandledning', name: 'Handledning', value: parseFloat(d['Handledning (Ha)  Budgeted']) },
        { id: 'barExamination', name: 'Examination', value: parseFloat(d['Examination (Ex)  Budgeted']) },
        { id: 'barKursutveckling', name: 'Kursutveckling', value: parseFloat(d['Kursutveckling (Ku)  Budgeted']) },
        { id: 'barAdministration', name: 'Administration', value: parseFloat(d['Administration (Adm)  Budgeted']) },
    ];

    const data2 = [
        { id: 'barFöreläsning2', name: 'Föreläsning', value: parseFloat(d['Föreläsning (Frl)  Allocated']) },
        { id: 'barÖvning2', name: 'Övning', value: parseFloat(d['Övning (Ovn)  Allocated']) },
        { id: 'barLaboration2', name: 'Laboration', value: parseFloat(d['Laboration (La)  Allocated']) },
        { id: 'barHandledning2', name: 'Handledning', value: parseFloat(d['Handledning (Ha)  Allocated']) },
        { id: 'barExamination2', name: 'Examination', value: parseFloat(d['Examination (Ex)  Allocated']) },
        { id: 'barKursutveckling2', name: 'Kursutveckling', value: parseFloat(d['Kursutveckling (Ku)  Allocated']) },
        { id: 'barAdministration2', name: 'Administration', value: parseFloat(d['Administration (Adm)  Allocated']) },
    ];

    const x = d3
        .scaleBand()
        .range([0, width - left - right])
        .domain(data.map(d => d.name))
        .padding(0.1);

    const y = d3
        .scaleLinear()
        .range([height - top - bottom, 0])
        .domain([0, d3.max(data, d => d.value)]);




    return (
        <>
            <svg width={width} height={height}>
                <XAxis
                    scale={x}
                    top={top}
                    bottom={bottom}
                    left={left}
                    right={right}
                    height={height}
                />
                <YAxis
                    scale={y}
                    top={top}
                    bottom={bottom}
                    left={left}
                    right={right}
                />
                <g transform={`translate(${left}, ${top})`}>
                    {data.map((d, i) => (
                        <RectContainer
                            data={d}
                            x={x}
                            y={y}
                            top={top}
                            bottom={bottom}
                            height={height}
                        />
                    ))}
                    {data2.map((d, i) => (
                        <RectFill
                            data={d}
                            x={x}
                            y={y}
                            top={top}
                            bottom={bottom}
                            height={height}
                        />
                    ))}
                </g>
            </svg>
        </>
    );
}
import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import "./ProgressBar.css";

export default function ProgressBar(props) {
    const { percentage, budgeted, label, height } = props;
    const svgRef = useRef(null);

    const width = height;
    const arcWidth = height * 0.045;
    const arcOuterOuterRadious = width / 2.5 + arcWidth;
    const arcOuterRadius = width / 2.5;
    const arcInnerRadius = width / 2.5 - arcWidth;

    const arcGenerator = d3.arc()
            .startAngle(0)
            .cornerRadius(5);
    
    const progressArc = (inner, outer, value) =>
    arcGenerator({
        innerRadius: inner,
        outerRadius: outer,
        endAngle: 2 * Math.PI * value
    });

    const getColor = (p) => {
        return p < 1 ? 'red' : '#7CFC00';
    }

    const draw = () => {
        d3.select(svgRef.current).html(null);

        const svg = d3.select(svgRef.current)
            .style("width", width)
            .style("height", height);

        const circle = svg.append("circle")
            .style('cx', '50%')
            .style('cy', '50%')
            .style('r', height*0.30)

        svg.append('text')
            .text(`${(percentage*100).toFixed()}%`)
            .attr('id', 'percentageText')
            .attr('dx', '35%')
            .attr('dy', '55%');

        if(budgeted <= 0) {
            circle.style("opacity", 0.3)
                .style("fill", 'red');
        }
        else {
            circle.style("opacity", 0.2)
                .style("fill", 'grey');

            svg.append("g")
                .attr("transform", "translate(" + width/2 + "," + height/2 + ")")
                .append("path")
                .attr("d", progressArc(arcInnerRadius, arcOuterRadius, 1))
                .style("opacity", 0.5)
                .style("fill", 'grey');
    
            svg.append("g")
                .attr("transform", "translate(" + width/2 + "," + height/2 + ")")
                .append("path")
                .attr("d", progressArc(arcInnerRadius, arcOuterRadius, percentage))
                .style("opacity", 0.3)
                .style("fill", getColor(percentage));
    
            if(percentage > 1) {
                svg.append("g")
                    .attr("transform", "translate(" + width/2 + "," + height/2 + ")")
                    .append("path")
                    .attr("d", progressArc(arcOuterRadius, arcOuterOuterRadious, percentage-1))
                    .style("fill", '#008000');
            }
        }

        
    };

    useEffect(() => {
        draw();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [svgRef, percentage, height]);


    return (
        <div className="progressCol">
            <svg className="progressBar" ref={svgRef}></svg>
            <h5>{label}</h5>
        </div>
    )
}
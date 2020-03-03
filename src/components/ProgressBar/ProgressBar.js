import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import "./ProgressBar.css";

export default function ProgressBar(props) {
    const { percentage, label, height, bHours, aHours } = props;
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

        // Circle inside progress bar
        const circle = svg.append("circle")
            .style('cx', '50%')
            .style('cy', '50%')
            .style('r', height * 0.30)

        // Text in center
        const text = bHours > 0 ? `${aHours} / ${bHours}` : '0';
        const xPos = bHours === 0 ? '47%' : aHours < 9 ? '40%' : aHours > 9 && aHours < 100 ? '30%' : '27%';
        const tSize = bHours > 999 ? '0.6rem' : '0.8rem';

        // Text indicating % inside progress bar
        svg.append('text')
            .text(text)
            .attr('id', 'percentageText')
            .attr('dx', xPos)
            .attr('dy', '55%')
            .style('font-size', tSize);

        // Set border dashed and inner color to none if no budgeted hours
        if (bHours <= 0) {
            circle.style('fill', 'none')
                .style('stroke', 'black')
                .style('stroke-width', 2)
                .style('stroke-dasharray', 3);
        }
        // Otherwise fill the progressbar
        else {
            // Make circle in middle gray
            circle.style("opacity", 0.2)
                .style("fill", 'grey');

            // Grey contrainer bar (grey bar indicating budgeted hours)
            const progressContainer = svg.append("g")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
                .append("path")
                .style("opacity", 0.5)
                .style("fill", 'grey');

            // Transition for container progress
            progressContainer.transition()
                .duration(1000)
                .attrTween('d', () => {
                    return (t) => {
                        return progressArc(arcInnerRadius, arcOuterRadius, 1 * t);
                    }
                });

            // Percentage bar, shows percentage of allocated hours 
            const progress = svg.append("g")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
                .append("path")
                .style("opacity", 0.3)
                .style("fill", getColor(percentage));

            // Transition for inner progress
            progress.transition()
                .duration(1000)
                .attrTween('d', () => {
                    return (t) => {
                        return progressArc(arcInnerRadius, arcOuterRadius, percentage * t);
                    }
                });


            // If allocated hours > budgeted then add the extra outer line
            if (percentage > 1) {
                const outerProgress = svg.append("g")
                    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
                    .append("path")
                    .style("fill", '#008000');

                // Transition for outer progress
                outerProgress.transition()
                    .duration(1000)
                    .attrTween('d', () => {
                        return (t) => {
                            return progressArc(arcOuterRadius, arcOuterOuterRadious, (percentage-1) * t);
                        }
                    });
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
import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import "./ProgressBar.css";

export default function ProgressBar(props) {
    const { percentage, percentage2, percentage3, label, bHours, aHours, tHours, uHours, h } = props;
    const svgRef = useRef(null);

    const height = h ? h : 115;
    const width = h ? h : 115;
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
        return p < 1 ? '#F06E37' : '#56bf56';
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
            .style('font-weight', 'bold')
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
            // Circle in middle
            if (bHours > 0 && aHours === 0) 
                circle.style('fill', '#F06E37')
            else
                circle.style("fill", 'none');

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
                        return progressArc(arcInnerRadius + 3, arcOuterRadius, 1 * t);
                    }
                });

            // Percentage bar, shows percentage of allocated hours 
            const progress = svg.append("g")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
                .append("path")
                .style("fill", getColor(percentage));

            // Transition for inner progress
            progress.transition()
                .duration(1000)
                .attrTween('d', () => {
                    return (t) => {
                        return progressArc(arcInnerRadius - 1, arcOuterRadius + 1, percentage * t);
                    }
                });


            // If allocated hours > budgeted then add the extra outer line
            if (percentage > 1) {
                const toMuchAllo = svg.append("g")
                    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
                    .append("path")
                    .style("fill", '#2e662e');

                // Transition for toMuchAllo
                toMuchAllo.transition()
                    .duration(1000)
                    .attrTween('d', () => {
                        return (t) => {
                            return progressArc(arcInnerRadius, arcOuterRadius, (percentage - 1) * t);
                        }
                    });
            }

            // Outer line -> compares techer hours to allocated, only display if not enough teachers allocated
            if (tHours < aHours) {

                const outerProgress = svg.append("g")
                    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
                    .append("path")
                    .style("fill", '#EDB761');

                // Transition for outer progress
                outerProgress.transition()
                    .duration(1000)
                    .attrTween('d', () => {
                        return (t) => {
                            return progressArc(arcOuterRadius, arcOuterOuterRadious, percentage2 * t);
                        }
                    });
            }
            // Deals with UNKNOWN MID hours
            else if (uHours > 0) {
                const outerProgress = svg.append("g")
                    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
                    .append("path")
                    .style("fill", '#EDB761');

                // Transition for outer progress
                outerProgress.transition()
                    .duration(1000)
                    .attrTween('d', () => {
                        return (t) => {
                            return progressArc(arcOuterRadius, arcOuterOuterRadious, percentage3 * t);
                        }
                    });
            }
        }
    };

    useEffect(() => {
        draw();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [svgRef,percentage, percentage2, height, bHours, aHours, tHours]);

    const style = label !== 'Totalt' ? {fontSize: '1em'} : { fontSize: '0.8em'};
    return (
        <div className="progressCol">
            <svg className="progressBar" ref={svgRef}></svg>
            <h5>{label}</h5>
            {tHours < aHours && <p style={style} className="specialHours">{`${aHours - tHours} teacher hours missing`}</p>}
            {uHours > 0 && <p style={style} className="specialHours">{`${uHours} UNKNOWN MID hours`}</p>}
        </div>
    )
}
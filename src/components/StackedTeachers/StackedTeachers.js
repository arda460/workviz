import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import "./StackedTeachers.css";

export default function StackedTeachers(props) {
    const { d } = props;
    const svgRef = useRef(null);

    const margin = { top: 10, right: 20, bottom: 20, left: 50 };
    const width = Math.max(45 * Object.keys(d).length, 1100);
    const height = 190 - margin.top - margin.bottom;

    const handleData = () => {
        return Object.keys(d).map( key => {
            return {
                group: key,
                Frl: parseInt(d[key]['Frl']) ? parseInt(d[key]['Frl']) : 0,
                Ovn: parseInt(d[key]['Ovn']) ? parseInt(d[key]['Ovn']) : 0,
                La: parseInt(d[key]['La']) ? parseInt(d[key]['La']): 0,
                Ha: parseInt(d[key]['Ha']) ? parseInt(d[key]['Ha']): 0,
                Ex: parseInt(d[key]['Ex']) ? parseInt(d[key]['Ex']): 0,
                Ku: parseInt(d[key]['Ku']) ? parseInt(d[key]['Ku']) : 0,
                Adm: parseInt(d[key]['Adm']) ? parseInt(d[key]['Adm']) : 0
            }
        });
    };

    const draw = () => {
        d3.select(svgRef.current).html(null);
        const data = handleData();

        const svg = d3.select(svgRef.current)
            .style("width", width)
            .style("height", height+margin.bottom+margin.top)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        const subgroups = ['Frl', 'Ovn', 'La', 'Ha', 'Ex', 'Ku', 'Adm'];
        const groups = Object.keys(d);

        const maxVal = Math.max.apply(Math, data.map( obj => {
            return obj['Frl'] + obj['Ovn'] + obj['La'] + obj['Ha'] + obj['Ex'] + obj['Ku'] + obj['Adm'];
        }))

        // Add X axis
        const x = d3.scaleBand()
            .domain(groups)
            .range([0, width])
            .padding([0.2]);
        
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));


        /*
        // Lift every other label
        function liftOdd(d, i) {
            const attrY = d3.select(this).attr('y');
            const lift = i % 2 === 0 ? parseInt(attrY) + 10 : parseInt(attrY);
            d3.select(this).attr('y', lift);
        }

        svg.selectAll('text').each(liftOdd);
        */

        // Add Y axis
        const y = d3.scaleLinear()
            .domain([0, maxVal])
            .range([height, 0]);

        svg.append("g")
            .call(d3.axisLeft(y));

        // color palette = one color per subgroup
        const color = d3.scaleOrdinal()
            .domain(subgroups)
            .range(['#FCD26C', '#C9D897', '#365780', '#FAAD5F', '#7BBFCC', '#9DD0D1', '#EC9747']);

        
        //stack the data? --> stack per subgroup
        const stackedData = d3.stack()
            .keys(subgroups)
            (data)
        
        // Show the bars
        svg.append("g")
            .selectAll("g")
            // Enter in the stack data = loop key per key = group per group
            .data(stackedData)
            .enter().append("g")
            .attr("fill", function (d) { return color(d.key); })
            .selectAll("rect")
            // enter a second time = loop subgroup per subgroup to add all rectangles
            .data(function (d) { return d; })
            .enter().append("rect")
            .attr("x", function (d) { return x(d.data.group); })
            .attr("y", function (d) { return y(d[1]); })
            .attr("height", function (d) { return y(d[0]) - y(d[1]); })
            .attr("width", x.bandwidth())

    };

    useEffect(() => {
        draw();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [svgRef,d]);

    return (
        <div className="stackedTeachersRow">
            <div className="sChart">
                <svg className="stackedTeachers" ref={svgRef}></svg>
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
    )
}
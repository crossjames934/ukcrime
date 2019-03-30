import React, {Component} from 'react';
import * as d3 from 'd3';

const chartContainer = "chartContainer";
const mapSize = {
    width: "90vw",
    height: "80vh"
};

class Graphs extends Component {
    createGraph(data) {
        document.getElementById(chartContainer).innerHTML = "";
        // console.log(data);
        const values = Object.values(data);
        const properties = Object.keys(data);
        properties.splice(properties.indexOf('null'), 1, 'No Information');
        const mapPixelWidth = window.innerWidth * 0.9;
        const mapPixelHeight = window.innerHeight * 0.8;
        const chartPaddingX = mapPixelWidth * 0.1;
        const chartPaddingY = mapPixelHeight * 0.1;
        const chartWidth = mapPixelWidth - chartPaddingX * 2;
        const chartHeight = mapPixelHeight - chartPaddingY * 2;
        const xGap = chartWidth / values.length;
        const barWidth = 25;
        // console.log(properties, values);
        const xScale = d3.scaleBand()
            .range([0, chartWidth])
            .domain(properties);
        const yScale = d3.scaleLinear()
            .domain([d3.max(values), 0])
            .range([0, chartHeight])
            .nice();
        const svg = d3
            .select("#"+chartContainer)
            .append("svg")
            .attr("width", mapSize.width)
            .attr("height", mapSize.height)
            .style("background", '#ACCBE1');
        svg.selectAll("rect")
            .data(values)
            .enter()
            .append("rect")
            .attr("x", (d, i) => i * xGap + xGap / 2 + chartPaddingX - barWidth / 2)
            .attr("y", d => yScale(d) + chartPaddingY)
            .attr("width", barWidth)
            .attr("height", d => chartHeight - yScale(d))
            .attr("fill", "#536B78")
            .on('mouseover', (d, i) => {
                console.log(d, properties[i]);
            });
        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);
        svg.append("g")
            .attr("transform", `translate(${chartPaddingX}, ${chartHeight + chartPaddingY})`)
            .call(xAxis);
        svg.append("g")
            .attr("transform", `translate(${chartPaddingX}, ${chartPaddingY})`)
            .call(yAxis);
        const overlay = d3
            .select("#"+chartContainer)
            .append('div')
            .style('background', '#ACCBE1')
            .style('position', 'fixed')
            .style('width', 300)
            .style('height', 400)
            .style('z-index', 10)
            .style('top', 10)
            .style('left', 20);
    }

    componentDidUpdate() {
        // console.log(this.props.data);
        this.sortByCategory("object_of_search");
    }

    sortByCategory(category) {
        const data = this.props.data;
        const listOfSearchObjects = data.map(datum => datum[category]);
        const uniqueValues = [...new Set(listOfSearchObjects)];
        const jsObjectForGraph = {};
        uniqueValues.forEach(property => {
            jsObjectForGraph[property] = data.filter(datum => datum[category] === property).length;
        });
        this.createGraph(jsObjectForGraph);
    }

    render() {
        return (
            <div style={{display: !this.props.mapView ? "block" : "none"}}>
                <div style={mapSize} className="dataDisplay">
                    <div style={mapSize} id={chartContainer}/>
                </div>
            </div>
        );
    }
}

export default Graphs;